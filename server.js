const express = require("express");
const app = express();
const router = require("./API/Routers/router");
const session = require("express-session")
const cors = require("cors");
require("dotenv").config();
const store = require("./API/Models/sessionModel").store;

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json())
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: false,
    store: store
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