const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const nodemailer = require('nodemailer');

//Add Leads
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
                // res.json({status: "success", message: 'Lead added successfully.'})
                let testAccount = await nodemailer.createTestAccount();
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
                    from: `iNurture Education Solution <zishan@inurture.co.in>`,
                    to: `${emailAddress}`,
                    subject: `Online Enquiry For ${intrestedProgram}!`,
                    html: `<h3>Dear ${firstName},\n</h3>
                    <h4>Thank you for submitting your query. We will get in touch
                    with you shortly. \n\n</p> `
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    console.log('URL', nodemailer.getTestMessageUrl(info))
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

//Get all leads.
router.get('/all-leads', async(req, res)=>{
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

//Get lead by lead id.
router.get('/:id', async(req, res)=>{
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

//Delete lead by id.
router.delete('/delete/:id', async(req, res)=>{
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

//Delete multiple leads at once.
router.post('/delete-selected', async(req,res)=>{
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