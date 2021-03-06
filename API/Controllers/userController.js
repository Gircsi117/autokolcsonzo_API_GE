const pool = require("../Models/databaseModel");
const store = require("../Models/sessionModel").store;

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
                res.status(200).json({message:true, id: req.sessionID});
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
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            
        }
        else{
            store.destroy(req.params.id, (err)=>{
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("Sikeres kijelentkezés");
                    res.status(200).json({message: true})
                }
            })
        }
    })
}

exports.userUpdate = (req, res)=>{
    const id = req.params.id;
    store.get(id, (err, sess)=>{
        pool.query(`SELECT * FROM felhasznalo WHERE id = ${sess.user.Id} AND jelszo = SHA1('${req.body.oldPass}')`, (err, data1)=>{
            if (err) {
                console.log(err);
                res.status(500).json({message:false, data:"Adatbázis hiba!"})
            }
            else{
                if (data1.length == 0) {
                    res.status(500).json({message:false, data:"Az adott id és jelszó variációval nincs felhasználó"})
                }
                else{
                    pool.query(`SELECT * FROM felhasznalo WHERE (jelszo = SHA1('${req.body.newPass}') OR email = '${req.body.email}') AND email != '${sess.user.email}'`, (err, data1)=>{
                        if (err) {
                            console.log(err);
                            res.status(500).json({message:false, data:"Adatbázis hiba!"})
                        }
                        else{
                            if (data1.length != 0) {
                                res.status(500).json({message:false, data:"Az adott email vagy jelszó már foglat"})
                            }
                            else{
                                let pass = "";
                                if (req.body.newPass != "") {
                                    pass = `,jelszo = SHA1('${req.body.newPass}')`;
                                }
                                pool.query(`UPDATE felhasznalo SET nev = '${req.body.name}', email = '${req.body.email}' ${pass} WHERE Id = ${sess.user.Id}`, (err)=>{
                                    if (err) {
                                        res.status(500).json({message:false, data:"Adatbázis hiba!aaaa"})
                                    }
                                    else{
                                        sess.bente = true;
                                        sess.user = {
                                            Id: sess.user.Id,
                                            nev: sess.user.name,
                                            email: sess.user.email
                                        }
                                        store.set(id, sess, (err)=>{
                                            if (err) {
                                                res.status(500).json({message:false, data: "Sesion error"})
                                            }
                                            else{
                                                res.status(200).json({message:true, data:"Adatok sikeresen frissítve!"})
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })
}

exports.userGet = (req, res)=>{
    const id = req.params.id
    store.get(id, (err, sess)=>{
        if (err) {
            console.log(err);
            res.status(500).json({message:false, data: "Sesion error"})
        }
        else{
            try {
                res.status(200).json({message:true, data:sess.user})
            } catch (error) {
                res.status(500).json({message:false, data: "Sesion error"})
            }
            
        }
    })
}

exports.torol = (req, res)=>{
    const id = req.params.id;
    const table = req.query.table;
    const elemId = req.query.elemId;

    store.get(id, (err, sess)=>{
        if (err) {
            res.status(300).json({data:"Session error"})
        }
        else{
            pool.query(`DELETE FROM ${table} WHERE id = ${elemId}`, (err)=>{
                if (err) {
                    res.status(300).json({data:"Adatbázis error"})
                }
                else{
                    res.status(200).json({data:"Sikeresen törölve"})
                }
            })
        }
    })
}