const express = require("express");
const router = express.Router();

const userControler = require("../Controllers/userControler");
const deleteControler = require("../Controllers/deleteControler");
const updateControler = require("../Controllers/updateControler");

router.post("/login", userControler.login)
router.post("/reg", userControler.reg)
router.get("/logout", userControler.logout)



module.exports = router;