const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')

router.post('/create', async(req, res)=>{
    const {roleName} = req.body;
    const foundRole = await sequelize.models.Role.findOne({
        where: {
            roleName: roleName
        }
    })
    if(foundRole){
        res.status(400).json({
            status: "failure",
            error: "Role already exist."
        });
    }else{
        try {
            if(roleName === 'supadmin' || roleName === 'admin' || roleName === 'user'){
                const saved= await sequelize.models.Role.create({
                    roleName
                })
                if(saved){
                    res.json({status: "success", message: 'Role added successfully.'})
                }
            }else{
                res.status(401).json({
                    status: "failure",
                    error: "Access Denied."
                })
            }
            
        } catch (error) {
            res.status(500).json({
                status: "failure",
                error: error.message
            })
        }
    }
})


router.get('/all-role', async(req, res)=>{
    try {
        const roles=await sequelize.models.Role.findAll()
        if(roles){
            res.json(roles)
        }else{
            res.status(403).json({
                status: "failure",
                message: "Data not found."
            })
        }
        
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        })
    }
})

module.exports = router