const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
// const connectDB =require('./config/db')
const sequelize = require('./config/db')
const cors = require('cors')
const app=express()

//Load config.
dotenv.config({path:'./config/config.env'})

const corsOptions = {origin: 'http://localhost:4200'}
//Cors
app.use(cors(corsOptions))
app.use(express.json())

// connectDB()
sequelize.sync({force: true});
const PORT = process.env.PORT || 3000

//Sample get request.
app.get('/', (req, res)=>{
    res.send(`Server is running at port: ${PORT}`)
})

app.use('/api/leads', require('./api/lead'))

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)