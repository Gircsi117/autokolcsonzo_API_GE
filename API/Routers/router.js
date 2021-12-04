const express = require("express");
const router = express.Router();

const getControl = require("../Controlls/getControl");
const postControl = require("../Controlls/postControl");
const deleteControl = require("../Controlls/deleteControl");
const updateControl = require("../Controlls/updateControl");

router.get("/", getControl.home)



module.exports = router;