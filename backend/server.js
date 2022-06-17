const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config/db')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const path = require('path');
const app=express()
dotenv.config({path:'./config/config.env'})


const allowedDomains  = ['http://localhost:4200','https://inurture.co.in'];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
   
      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
}));

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use(express.json())


const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB()


const PORT = process.env.PORT || 3000

const userLimiter = rateLimit({
    windowMS: 15*60*1000, // 10 minutes
    max: 8,
    message: 'Too many requests, please try again after 10 minutes.',
})

const leadFetchLimiter = rateLimit({
    windowMS: 15*60*1000, // 15 minutes
    max: 50,
    message: 'Too many requests, please try again after 15 minutes.',
})

const roleLimiter = rateLimit({
    windowMS: 15*60*1000, // 15 minutes
    max: 20,
    message: 'Too many requests, please try again after 15 minutes.'
})

app.get('/', (req, res)=>{
    res.send(`Server is running at port: ${PORT}`)
})

app.use('/api/leads',leadFetchLimiter, require('./api/lead'))
app.use('/api/role',roleLimiter, require('./api/role'))
app.use('/api/user',userLimiter, require('./api/user'))

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)