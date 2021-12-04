const express = require("express");
const router = express.Router();

const getControler = require("../Controllers/getControler");
const postControler = require("../Controllers/postControler");
const deleteControler = require("../Controllers/deleteControler");
const updateControler = require("../Controllers/updateControler");

router.get("/", getControler.home)



module.exports = router;