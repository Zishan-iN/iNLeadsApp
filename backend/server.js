const express =require('express')
const dotenv =require('dotenv')
const connectDB =require('./config/db')
const cors = require('cors')

//Load config.
dotenv.config({path:'./config/config.env'})
const corsOptions = {origin: 'http://localhost:4200'}
//Cors
app.use(cors(corsOptions))
app.use(express.json())

connectDB()

const app=express()

const PORT = process.env.PORT || 3000

app.use('/api/leads', require('./api/lead'))

app.listen(
    PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)