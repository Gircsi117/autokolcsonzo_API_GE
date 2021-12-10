const pool = require("../Models/databaseModel")
const store = require("../Models/sessionModel").store;

exports.user = (req, res)=>{
    const id = req.params.id
    store.get(id, (err, sess)=>{
        if (err) {
            console.log(err);
        }
        else{
            res.status(200).json({message:true, data: sess.user})
        }
    })
}