const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth')

router.post('/create', async(req, res)=>{
    const {firstName, emailAddress, phone, intrestedProgram, intrestedUniversity, userConsent} = req.body;
    const founLead = await sequelize.models.Lead.findOne({
        where: {
            firstName: firstName,
            emailAddress: emailAddress,
            phone: phone,
            intrestedProgram: intrestedProgram,
            intrestedUniversity:intrestedUniversity,
            userConsent:userConsent
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
                intrestedUniversity,
                userConsent
            })
            if(saved){
                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: true,
                    auth: {
                        user: process.env.LEADMAILER_USER,
                        pass: process.env.LEADMAILER_PASSWORD 
                    },
                    // ignoreTLS: true
                });
                let mailOptions ={
                    from: `iNurture Lead ${process.env.LEADMAILER_USER}`,
                    to: `${emailAddress}`,
                    subject: `Online Enquiry For ${intrestedProgram}!`,
                    html: `<p>Hi ${firstName},\n\n</p>
                    <p>Thank you for expressing interest in ${intrestedUniversity} ${intrestedProgram}.<br>Our career counsellor will soon get in touch with you.
                    <br><br>Nearly any path you follow is bound to lead to something greater. Now that you have made your first move towards your career path, you are sure to explore better opportunities with our new-age programs and reach greater success in your career.\n\n</p>
                    <p>Best Regards,<br>iNurture Education Solutions</p>`
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
                        error: 'Email Config Error'
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
        const leads=await sequelize.models.Lead.findAll(
            {
                order: [['updatedAt', 'DESC']],
                // offset:1,
                // limit: 10
            }
        )
        if(leads){
            res.json(leads)
        }else{
            res.status(404).json({
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

router.get('/lead-agree/', auth, async(req, res)=>{
    const  userConsent = req.query.userConsent
    try {
        const leads = await sequelize.models.Lead.findAll({
            where: {
                userConsent: userConsent
            },
            order: [['updatedAt', 'DESC']],
        })
        if(leads){
            res.json(leads)
        }else{
            res.status(404).json({
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
            res.status(404).json({
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
            res.status(404).json({
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