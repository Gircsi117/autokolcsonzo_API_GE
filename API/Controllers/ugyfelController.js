const pool = require("../Models/databaseModel")
const store = require("../Models/sessionModel").store;

exports.ugyfelAdd = (req, res)=>{
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            res.status(500).json({
                message:false,
                data: "Session error!"
            })
        }
        else{
            pool.query(`SELECT * FROM ugyfelek WHERE szig = '${req.body.szig}'`, (err, data1)=>{
                if (err) {
                    res.status(500).json({
                        message:false,
                        data: "Adatbázishiba"
                    })
                }
                else{
                    if (data1.length > 0) {
                        res.status(200).json({
                            message:false,
                            data: "A személyi szám már szerepel az adatbázisban!"
                        })
                    }
                    else{
                        pool.query(`INSERT INTO ugyfelek VALUES (null, '${req.body.nev}', '${req.body.szig}', '${req.body.lakcim}')`, (err)=>{
                            if (err) {
                                res.status(500).json({
                                    message:false,
                                    data: "Adatbázishiba"
                                })
                            }
                            else{
                                res.status(200).json({
                                    message: true,
                                    data: "Sikeres ügyfél felvétel!"
                                })
                            }
                        })
                    }
                }
            })
        }
    })
}