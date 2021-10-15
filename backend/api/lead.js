const express = require('express')
const router = express.Router()
const Lead = require('../models/lead')

//Add Leads
router.post('/create', async(req, res)=>{
    const {firstName, emailAddress, phone, intrestedProgram, intrestedUniversity} = req.body
    try {
        const saved=Lead.create({
            firstName,
            emailAddress,
            phone,
            intrestedProgram,
            intrestedUniversity
        })
        if(saved){
            res.json({status: "success", message: 'Lead added'})
        }
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        })
    }
})

router.get('/all-leads', async(req, res)=>{
    try {
        const leads=await Lead.findAll()
        res.send({})
    } catch (error) {
        
    }
})

module.exports =router