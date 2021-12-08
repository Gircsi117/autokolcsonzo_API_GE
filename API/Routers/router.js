const express = require("express");
const router = express.Router();

const getControler = require("../Controllers/getControler");
const postControler = require("../Controllers/postControler");
const deleteControler = require("../Controllers/deleteControler");
const updateControler = require("../Controllers/updateControler");

router.get("/", getControler.home)
router.post("/reg", getControler.reg)



module.exports = router;