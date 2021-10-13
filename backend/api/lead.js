const express = require('express')
const router = express.Router()

//Add Leads
router.post('/create', async(req, res)=>{
    const {name, email, phone, intrestedCourse, intrestedUniversity} = req.body
    try {
        
    } catch (error) {
        
    }
})

module.exports =router