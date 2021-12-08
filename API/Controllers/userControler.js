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
                req.session.bente = true;
                console.log(req.session.user);
                console.log("Sikeres bejelentkezés");
                res.status(200).json({message:true});
            }
            else{
                console.log("Sikertelen bejelentkezés");
                res.status(200).json({message:false});
            }
        }
    })
}

exports.logout = (req, res)=>{
    req.session.user = null;
    req.session.bente = null;
    console.log("Sikeres kijelentkezés");
    res.status(200).json({message: true})
}