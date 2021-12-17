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