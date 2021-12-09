const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true
}))

const userController = require("../Controllers/userController");
const ugyfelController = require("../Controllers/ugyfelController");
const carController = require("../Controllers/carController");
const kolcsonController = require("../Controllers/kolcsonController");

router.post("/login", userController.login)
router.post("/reg", userController.reg)
router.get("/logout", userController.logout)
router.get("/user", userController.getuser);



module.exports = router;