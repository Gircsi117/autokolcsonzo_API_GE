const pool = require("../Models/databaseModel");
const store = require("../Models/sessionModel").store;

exports.getNewKolcson = (req, res)=>{
    const id = req.params.id;

    store.get(id, (err, sess)=>{
        if (err) {
            res.status(300).json({message:false, data:"Session error"});
        }
        else{
            pool.query(`SELECT * FROM ugyfelek WHERE szig = "${req.body.szemSzam}"`, (err, ugyfelData)=>{
                if (err) {
                    res.status(300).json({message:false, data:"Adatbázis error!1"});
                }
                else{
                    if (ugyfelData.length == 0) {
                        res.status(300).json({message:false, data:"Az ügyfél nem található az adatbázisban!"});
                    }
                    else{
                        pool.query(`SELECT * FROM gepjarmuvek WHERE id = ${req.body.carId} AND status = 0`, (err, carData)=>{
                            if (err) {
                                res.status(300).json({message:false, data:"Adatbázis error!2"});
                            }
                            else{
                                if (carData.length == 0) {
                                    res.status(300).json({message:false, data:"Az autó szervízen van, vagy már kiadták!"});
                                }
                                else{
                                    pool.query(`INSERT INTO kolcsonzesek VALUES (null, ${ugyfelData[0].id}, ${carData[0].id}, ${sess.user.Id}, CURRENT_DATE, null, ${carData[0].km_ora}, null, null, null)`, (err)=>{
                                        if (err) {
                                            res.status(300).json({message:false, data:"Adatbázis error!3"});
                                        }
                                        else{
                                            pool.query(`UPDATE gepjarmuvek SET status= 1 WHERE id = ${carData[0].id}`, (err)=>{
                                                if (err) {
                                                    res.status(300).json({message:false, data:"Adatbázis error!4"});
                                                }
                                                else{
                                                    res.status(200).json({message:true, data:"Foglalás sikeresen végrehajtva!"});
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
        }


    })
}

exports.autok_foglal = (req, res)=>{
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            res.status(500).json({message: false, data: "Session error"});
        }
        else{
            try {
                console.log(sess.bente);
                if (sess.bente) {
                    const tol = req.query.tol;
                    pool.query(`SELECT kolcsonzesek.id, ugyfelek.szig, ugyfelek.nev, gepjarmuvek.id as auto_id, gepjarmuvek.tipus, kolcsonzesek.kiad_datum, gepjarmuvek.km_ora, gepjarmuvek.szerviz_km, gepjarmuvek.napi_dij, gepjarmuvek.km_dij, gepjarmuvek.szerviz_dij FROM kolcsonzesek INNER JOIN ugyfelek ON ugyfelek.id = kolcsonzesek.ugyfel_id JOIN gepjarmuvek ON gepjarmuvek.id = kolcsonzesek.gepjarmu_id WHERE kolcsonzesek.visszahoz_datum is null LIMIT 5 OFFSET ${tol*5};`, (err, data1)=>{
                        if (err) {
                            res.status(500).json({message: false, data: "Adatbázis error"});
                        }
                        else{
                            console.log(data1);
                            res.status(200).json({message: true, data: data1, tol:tol});
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({message: false, data: "logout"})
            }
            
        }
    })
}