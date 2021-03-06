const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 300 * 1024,
    },
    fileFilter: fileFilter,
});

let userId;
router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try {        
        let foundUser = await sequelize.models.User.findOne(
            {
                where:{
                    email: email
                },
                include: [sequelize.models.Role]
            }
        )
        if(!foundUser){
            return res.status(404).json({
                status: "failure",
                message: `User doesn't exist`
            });
        }else{
            const isMatch = await bcrypt.compare(password, foundUser.password)
            if(!isMatch){
                return res.status(401).json({
                    status: "failure",
                    message: 'Invalid Credentials.'
                });
             } 

             const payload = {
                user: {
                  id: foundUser.id
                }
              };
              const expireTime = 3600;
              jwt.sign(payload, process.env.jwtSecretKey,{
                expiresIn: expireTime
              },(err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    name: foundUser.name,
                    profileImage: foundUser.profileImage,
                    role: foundUser.Role.roleName,
                    token: token,
                    expireTime: expireTime
                })
              })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        });
    }
})

router.post('/forgot-password', async(req, res)=>{
    const {email} = req.body.email
    try {
        const user = await sequelize.models.User.findOne({
            where:{
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({
              status: "failure",
              message: 'User not registred.'
            });
        }
        userId = user.id;
        const payload = {
            user: {
                id: userId,
            },
        };
        jwt.sign(payload, process.env.jwtSecretKey, (err, token)=>{
            if (err) {
                res.status(400).json({
                        status: "failure",
                        message: error.message
                })
            }else{
                
                let smtpconfig = {
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: true,
                    auth: {
                        user: process.env.LEADMAILER_USER,
                        pass: process.env.LEADMAILER_PASSWORD 
                    },
                    ignoreTLS: true 
                };

                let transporter = nodemailer.createTransport(smtpconfig)

                let mailOptions ={
                    from: `iNurture Lead ${process.env.LEADMAILER_USER}`,
                    to: `${email}`,
                    subject: 'Password Reset!',
                    html: `<p>Dear ${user.name},\n</p>
                    <h4>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</h4>
                    <p>Please click on the link, or paste link address into your browser to complete the process:\n\n</p>
                    <p><a href="http://localhost:4200/reset-password?token=${token}">Reset Password</a> \n\n</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.\n\n<p>
                    <p>iNurture Team\n</p>`
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    if(info){
                        res.status(201).json({
                            status: "success",
                            message: `Reset link sent successfully to ${email}.`,
                        });
                    }
                    return res.status(500).json({
                        status: "failure",
                        message: 'Unknown Error occured.'
                    })
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

router.post('/reset-password/:token', async(req,res)=>{
    let token = req.params.token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecretKey)
        req.user = decoded.user
        const {password} = req.body
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        let foundUser = await sequelize.models.User.update({password: newPassword},{
            where:{
                id: req.user.id
            }
        })
        if(foundUser){
            res.status(200).json({
            status: "success",
            message: 'Password has been successfully changed.'
          });
        }else{
            res.status(400).json({
                status: "failure",
                message: error.message
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})

router.patch('/change-password',[auth, check('password', 'Please enter a password of 8 or more characters').isLength({min: 8, max:12}),
check( 'oldpassword', 'Please enter old password of 8 or more characters').isLength({min: 8, max:12})], async(req, res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({
        error: error.array(),
      });
    }
    const  {password, oldpassword} = req.body
    try {
        const currUser = await sequelize.models.User.findOne({
            where:{
                id: req.user.id
            }
        })
    
        const isMatch = await bcrypt.compare(oldpassword, currUser.password)
        if(!isMatch){
            return res.status(400).json({
                status: "failure",
                message: "Old password not matched."
            });
        }else{
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            const foundUser = await sequelize.models.User.update({password: newPassword},{
                where:{
                    id: req.user.id
                }
            })
            if(!foundUser){
                return res.status(400).json({
                    status: "failure",
                    message: "Some error occured while changing password, please try later."
                })
            }
            res.status(200).json({
                status: "success",
                message: "Password successfully changed."
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        })
    }
})

router.post('/create-user',auth, async(req,res)=>{
    const salt =  bcrypt.genSaltSync(10);
    const name = req.body.name
    const password = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email
    const profileImage = req.body.profileImage
    const roleId =req.body.roleId
    try {
        let user = await sequelize.models.User.findOne({
            where:{
                email: email
            }
        })

        if(user){
            return res.status(400).json({
                status: "failure",
                error: 'User already exist.'
            });
        }else{
            const saved = await sequelize.models.User.create({
                name, 
                email, 
                password, 
                profileImage, 
                roleId
            })
            if(saved){
                res.json({status: "success", message: 'User added successfully.'})
            }
        }
        
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

router.patch('/change-profile-photo', auth, upload.single('profileImg'),async(req, res)=>{
    try {
        const filePath = req.file.path
        const currUser = await sequelize.models.User.findOne({
            where:{
                id: req.user.id
            }
        })
        if(currUser){
            const foundUser = await sequelize.models.User.update({profileImage: filePath},{
                where:{
                    id: req.user.id
                }
            })
            if(!foundUser){
                return res.status(400).json({
                    status: "failure",
                    message: "Some error occured while changing password, please try later."
                })
            } 
            res.status(200).json({
                profileImage: !!currUser.profileImage?currUser.profileImage:null, 
                status: "success",
                message: "Photo successfully changed."
            });
        }

    } catch (error) {
        
    }
})

router.post('/create-sup-user', async(req,res)=>{
    const salt =  bcrypt.genSaltSync(10);
    const name = req.body.name
    const password = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email
    const profileImage = req.body.profileImage
    const roleId =req.body.roleId
    try {
        let user = await sequelize.models.User.findOne({
            where:{
                email: email
            }
        })
        if(user){
            return res.status(400).json({
                status: "failure",
                error: 'Sup admin already exist.'
            });
        }else{
            let userName = name.toLowerCase();
            if(userName === 'zishan'){
                const saved = await sequelize.models.User.create({
                    name, 
                    email, 
                    password, 
                    profileImage, 
                    roleId
                })
                if(saved){
                    res.json({status: "success", message: 'admin added successfully.'})
                }
            }else{
                return res.status(401).json({
                    status: "failure",
                    error: 'Access Denied.'
                });
            }

        }
        
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: error.message
        })
    }
})

router.get('/user-profile', auth, async(req,res)=>{
    try {
        const currUser = await sequelize.models.User.findOne({
            where:{
                id: req.user.id
            }
        })
        if(!currUser){
            return res.status(404).json({
                status: "failure",
                error: 'User not found.'
            });
        }
        return res.status(200).json({
            name: currUser.name,
            profileImage: !!currUser.profileImage? currUser.profileImage:null,
            role: currUser.roleName,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            error: error.message
        });
    }
})

module.exports = router

