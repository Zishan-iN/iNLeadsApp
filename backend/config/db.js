const mysql = require('mysql');

const connectDB = async () =>{
    try {
        const conn = mysql.createConnection(process.env.MYSQL_URI)
        conn.connect();
        console.log(`Database connected.`)
    } catch (error) {
        console.error('Custome', error)
        process.exit(1)
    }
}

module.exports =connectDB