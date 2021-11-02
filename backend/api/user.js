const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
// const sendmail = require('sendmail')({silent: true, devPort: 3000})

let userId;
//Login
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
                    email: foundUser.email,
                    profileImage: foundUser.profileImage,
                    role: foundUser.Role.roleName,
                    token: token 
                })
              })
        }
    } catch (err) {
        res.status(500).json({
            status: "failure",
            error: err.message
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
            return res.status(403).json({
              status: "failure",
              message: 'User not registred.'
            });
        }
        userId = user.id;
        let testAccount = await nodemailer.createTestAccount();  //Remove this line for production
        const payload = {
            user: {
                id: userId,
            },
        };
        jwt.sign(payload, process.env.jwtSecretKey, (err, token)=>{
            if (err) {
                res.status(400).json({
                        status: "failure",
                        error: err.message
                })
            }else{
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });
                let mailOptions ={
                    from: `iNurture Lead App <zishan@inurture.co.in>`,
                    to: `${email}`,
                    subject: 'Change Password Request!',
                    html: `<h3>Dear ${user.name},\n</h3>
                    <h4>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</h4>
                    <p>Please click on the link, or paste link address into your browser to complete the process:\n\n</p>
                    <p><a href="http://localhost:4200/reset-password?token=${token}">Reset Password</a> \n\n</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.\n<p>`
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    console.log('URL', nodemailer.getTestMessageUrl(info))
                    if(info){
                        res.status(201).json({
                            status: "success",
                            message: `Reset link sent successfully to ${email}.`,
                        });
                    }
                    return res.status(500).json({
                        status: "failure",
                        error: error.message
                    })
                })
                // console.log('Runn')
                // sendmail({
                //     from: `zish4u@gamil.com`,
                //     to: `${email}`,
                //     subject: 'Change Password Request!',
                //     html: `<h3>Dear ${user.name},\n</h3>
                //     <h4>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</h4>
                //     <p>Please click on the link, or paste link address into your browser to complete the process:\n\n</p>
                //     <p><a href="http://localhost:4200/reset-password?token=123">Reset Password</a> \n\n</p> 
                //     <p>If you did not request this, please ignore this email and your password will remain unchanged.\n<p>`
                // },(err, reply)=>{
                //     console.log(err)
                //     console.dir(reply)
                // })
        }
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error: error.message
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
                error: err.message
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: err.message
        })
    }
})

//Create user
router.post('/create-user', async(req,res)=>{
    const salt =  bcrypt.genSaltSync(10);
    // const {name, email, password, profileImage, roleId} = req.body
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
            error: error.message
        })
    }
})

module.exports = router

