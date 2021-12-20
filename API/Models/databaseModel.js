//sequelize

const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
})

pool.getConnection((err, connect)=>{
    if (err) {
        console.log(err);
    }
    else{
        console.log("Csatlakozva az adatbázishoz...");
    }
})

module.exports = pool;