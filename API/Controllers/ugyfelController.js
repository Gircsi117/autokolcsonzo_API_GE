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

exports.allUgyfel = (req, res)=>{
    const tol = req.query.tol;
    pool.query(`SELECT * FROM ugyfelek WHERE 1 LIMIT 5 OFFSET ${tol*5}`, (err, data1)=>{
        if (err) {
            res.status(300).json({message:false, data:"Adatbázis error"})
        }
        else{
            res.status(200).json({message:true, data:data1})
        }
    })
}

exports.updateUgyfel = (req, res)=>{
    const id = req.params.id
    store.get(id, (err, sess)=>{
        if (err) {
            res.status(300).json({message:false, data:"Session error"})
        }
        else{
            pool.query(`SELECT * FROM ugyfelek WHERE szig = ${req.body.szig} AND id != ${req.body.id}`, (err, data1)=>{
                if (err) {
                    res.status(300).json({message:false, data:"Adatbázis error"})
                }
                else if (data1.length != 0) {
                    res.status(300).json({message:false, data:"A személyi szám már foglalt"})
                }
                else{
                    pool.query(`UPDATE ugyfelek SET nev='${req.body.name}',szig='${req.body.szig}',lakcim='${req.body.lakcim}' WHERE id = ${req.body.id}`, (err)=>{
                        if (err) {
                            res.status(300).json({message:false, data:"Adatbázis error"})
                        }
                        else{
                            res.status(200).json({message:false, data:"Adatok sikeresen módosítva"})
                        }
                    })
                }
            })
        }
    })
}