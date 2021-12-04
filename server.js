const express = require("express");
const app = express();
const router = require("./API/Routers/router");
const session = require("express-session")
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true
}))
app.use("/", router)


app.listen(port, (err)=>{
    if (err) {
        console.log(err);
    }
    else{
        console.log("A szerver fut..."+port);
    }
})