const pool = require("../Models/databaseModel")

exports.home = (req, res)=>{
    const nev = "Erik"
    req.session.name = nev;
    res.status(200).json({"name":req.session.name})
}

exports.reg = (req, res)=>{
    const data = {"name": req.body.name, "pass":req.body.pass, "email":req.body.email}
    pool.query(`INSERT INTO felhasznalo VALUES (null, '${data.name}', '${data.email}', SHA1('${data.pass}'))`, (err)=>{
        if (err) {
            console.log(err);
            res.status(500).json({"message": err.message})
        }
        else{
            res.status(200).json(data)
        }
    })
    
}