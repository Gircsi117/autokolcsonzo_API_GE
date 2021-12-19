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

exports.autoSzam = (req, res)=>{
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            res.status(500).json({message: false, data: "Session error"});
        }
        else{
            try {
                console.log(sess.bente);
                if (sess.bente) {
                    pool.query(`SELECT COUNT(id) as "szam" FROM gepjarmuvek WHERE status = 0`, (err, data1)=>{
                        if (err) {
                            res.status(500).json({message: false, data: "Adatbázis error"});
                        }
                        else{
                            console.log(data1[0].szam);
                            res.status(200).json({message: true, data: data1[0].szam});
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({message: false, data: "logout"})
            }
            
        }
    })
}

exports.foglalSzam = (req, res)=>{
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            res.status(500).json({message: false, data: "Session error"});
        }
        else{
            try {
                console.log(sess.bente);
                if (sess.bente) {
                    pool.query(`SELECT COUNT(id) as "szam" FROM gepjarmuvek WHERE status = 1`, (err, data1)=>{
                        if (err) {
                            res.status(500).json({message: false, data: "Adatbázis error"});
                        }
                        else{
                            console.log(data1[0].szam);
                            res.status(200).json({message: true, data: data1[0].szam});
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({message: false, data: "logout"})
            }
            
        }
    })
}


exports.autok = (req, res)=>{
    store.get(req.params.id, (err, sess)=>{
        if (err) {
            res.status(500).json({message: false, data: "Session error"});
        }
        else{
            try {
                console.log(sess.bente);
                if (sess.bente) {
                    const tol = req.query.tol;
                    pool.query(`SELECT * FROM gepjarmuvek WHERE status = 0 LIMIT 5 OFFSET ${tol*5};`, (err, data1)=>{
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
                    pool.query(`SELECT kolcsonzesek.id, ugyfelek.szig, ugyfelek.nev, gepjarmuvek.id, gepjarmuvek.tipus, kolcsonzesek.kiad_datum, gepjarmuvek.km_ora, gepjarmuvek.szerviz_km, gepjarmuvek.napi_dij, gepjarmuvek.km_dij, gepjarmuvek.szerviz_dij FROM kolcsonzesek INNER JOIN ugyfelek ON ugyfelek.id = kolcsonzesek.ugyfel_id JOIN gepjarmuvek ON gepjarmuvek.id = kolcsonzesek.gepjarmu_id WHERE kolcsonzesek.visszahoz_datum is null LIMIT 5 OFFSET ${tol*5};`, (err, data1)=>{
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