const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth')

router.post('/create', async(req, res)=>{
    const {firstName, emailAddress, phone, intrestedProgram, intrestedUniversity} = req.body;
    const founLead = await sequelize.models.Lead.findOne({
        where: {
            firstName: firstName,
            emailAddress: emailAddress,
            phone: phone,
            intrestedProgram: intrestedProgram,
            intrestedUniversity:intrestedUniversity
        }
    })
    if(founLead){
        res.status(400).json({
            status: "failure",
            error: "Lead already exist."
        });
    }else{
        try {
            const saved= await sequelize.models.Lead.create({
                firstName,
                emailAddress,
                phone,
                intrestedProgram,
                intrestedUniversity
            })
            if(saved){
                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: false,
                    auth: {
                        user: process.env.LEADMAILER_USER,
                        pass: process.env.LEADMAILER_PASSWORD 
                    },
                });
                let mailOptions ={
                    from: `iNurture Lead ${process.env.LEADMAILER_USER}`,
                    to: `${emailAddress}`,
                    subject: `Online Enquiry For ${intrestedProgram}!`,
                    html: `<p>Dear ${firstName},\n</p>
                    <p>Thank you for submitting your query. We will get in touch
                    with you shortly. \n\n</p> 
                    <p>iNurture Team!\n</p>`
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    if(info){
                        res.status(201).json({
                            status: "success",
                            message: `Lead added and email Sent Successfully to ${emailAddress}`
                        });
                    }
                    return res.status(400).json({
                        status: "failure",
                        error: error.message
                    })
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

router.get('/all-leads',auth, async(req, res)=>{
    try {
        const leads=await sequelize.models.Lead.findAll()
        if(leads){
            res.json(leads)
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

router.get('/:id',auth, async(req, res)=>{
    try {
        const id = req.params.id
        const lead = await sequelize.models.Lead.findOne({
            where: {
                id: id
            }
        });
        if(lead){
            res.json(lead)
        }else{
            res.status(403).json({
                status: "failure",
                message: "Lead not found."
            })
        }
        
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        })
    }
})

router.delete('/delete/:id',auth, async(req, res)=>{
    try {
        const id = req.params.id
        const lead = await sequelize.models.Lead.destroy({
            where: {
                id: id
            }
        });
        if(!!lead){
            res.json({status: "success", message: 'Lead deleted successfully.'})
        }else{
            res.status(403).json({
                status: "failure",
                message: "Lead not exist."
            })
        }
        
    } catch (error) {
        res.status(400).json({
            status: "failure",
            error: error.message
        })
    }
})


router.post('/delete-selected',auth, async(req,res)=>{
    try {
        const idArray = req.body
        const leadsDeleted = await sequelize.models.Lead.destroy({
            where: { id:  idArray} 
        })
        if(leadsDeleted){
            res.status(200).json({
                status: "success",
                message: "Selected leads are deleted successfully."
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status: "failure",
            error: err.message
        })
    }
})



module.exports =router