const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const sequelize = require('../config/db')


//Login
router.post('/login', async(req, res)=>{
    const {email, password} =req.body
    try {
        let user = await sequelize.models.User.findOne({
            where:{
                email: email
            }
        })
        if(!user){
            return res.status(404).json({
                status: "failure",
                message: `User doesn't exist`
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error: err.message
        });
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

