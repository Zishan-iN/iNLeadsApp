const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: ''
    },
});

//Login
router.post('/login', async(req, res)=>{
    const {email, password} =req.body
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
            }else{
                //const roleName = await sequelize.models.Role.findOne(user.roleId)
                res.status(200).json({
                    name: foundUser.name,
                    email: foundUser.email,
                    profileImage: foundUser.profileImage,
                    role: foundUser.Role.roleName
                })
            }
        }
    } catch (error) {
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
        }else{
            let mailOptions ={
                from: `Lead App <zishan@inurture.co.in>`,
                to: `${email}`,
                subject: 'Change Password Request!',
                html: `<h3>Dear ${user.name},\n</h3>
                <h4>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</h4>
                <p>Please click on the link, or paste this into your browser to complete the process:\n\n</p>
                <p>http://localhost:4200/reset-password?token=123 \n\n</p> 
                <p>If you did not request this, please ignore this email and your password will remain unchanged.\n<p>`
            }
            transporter.sendMail(mailOptions, (error,info)=>{
                if(error){
                    return res.status(500).json({
                        status: "failure",
                        error: error.message
                    })
                }
                res.status(201).json({
                    status: "success",
                    message: `Reset Link Sent Successfully to ${email} with further instructions.`
                });
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error: error.message
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

