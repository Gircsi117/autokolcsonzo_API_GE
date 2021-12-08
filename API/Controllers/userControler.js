const pool = require("../Models/databaseModel")

exports.login = (req, res)=>{
    const email = req.body.email;
    const pass = req.body.pass;

    pool.query(`SELECT * FROM felhasznalo WHERE email = '${email}' AND jelszo = SHA1('${pass}');`, (err, data)=>{
        if (err) {
            console.log(err);
            res.status(500).json({message:false});
        }
        else{
            if (data.length > 0) {
                req.session.user = data[0];
                res.status(200).json({message:true});
            }
            else{
                res.status(200).json({message:false});
            }
            
        }
        
    })
}