const pool = require("../Models/databaseModel")
const session = require("express-session");

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

exports.reg = (req, res)=>{
    const data = {"name": req.body.name, "pass":req.body.pass, "email":req.body.email, "key":req.body.key}

    if (data.key == "ZsalmA") {
        pool.query(`SELECT * FROM felhasznalo WHERE email = '${data.email}' OR jelszo = SHA1('${data.pass}')`, (err1, data1)=>{
            if (err1) {
                res.status(500).json({message: false, err:"Adatbázis hiba!"})
            }
            else{
                if (data1.length == 0) {
                    pool.query(`INSERT INTO felhasznalo VALUES (null, '${data.name}', '${data.email}', SHA1('${data.pass}'))`, (err)=>{
                        if (err) {
                            console.log(err);
                            res.status(500).json({message: err.message, err: "Adatbázis hiba!"});
                        }
                        else{
                            res.status(200).json({message: true});
                        }
                    })
                }
                else{
                    res.status(200).json({message: false, err:"Email vagy jelszó már használatban van!"})
                }
            }
        })
    }
    else{
        res.status(200).json({message: false, err:"Hibás kulcs"})
    }
}

exports.logout = (req, res)=>{
    console.log(req.session.user);
    req.session.user = null;
    req.session.bente = null;
    console.log("Sikeres kijelentkezés");
    res.status(200).json({message: true})
}

exports.getuser = (req, res)=>{
    res.status(200).json({"name": req.session.user})
}