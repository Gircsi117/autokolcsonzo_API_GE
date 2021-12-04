const pool = require("../Models/databaseModel")

exports.home = (req, res)=>{
    const nev = "Erik"
    req.session.name = nev;
    res.send(req.session.name)
}