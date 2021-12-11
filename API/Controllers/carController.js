const pool = require("../Models/databaseModel")
const store = require("../Models/sessionModel").store;

exports.carAdd = (req, res)=>{
    const id = req.params.id;

    store.get(id, (err, sess)=>{
        if (err) {
            res.status(500).json({message: false, data: "Session hiba"})
        }
        else{
            pool.query(`INSERT INTO gepjarmuvek VALUES (null, '${req.body.gyarto}', '${req.body.tipus}', ${req.body.km_ora}, ${req.body.szerviz_dij}, ${req.body.napi_dij}, ${req.body.km_dij}, ${req.body.szerviz_km}, ${req.body.status})`, (err)=>{
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
    })
}