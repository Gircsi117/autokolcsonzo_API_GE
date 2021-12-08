const express = require("express");
const router = express.Router();

const getControler = require("../Controllers/getControler");
const userControler = require("../Controllers/userControler");
const deleteControler = require("../Controllers/deleteControler");
const updateControler = require("../Controllers/updateControler");

router.get("/", getControler.home)
router.post("/reg", getControler.reg)

router.post("/login", userControler.login)



module.exports = router;