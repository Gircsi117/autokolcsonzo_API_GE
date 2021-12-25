const express = require("express");
const router = express.Router();
const session = require("express-session");

const userController = require("../Controllers/userController");
const ugyfelController = require("../Controllers/ugyfelController");
const carController = require("../Controllers/carController");
const kolcsonController = require("../Controllers/kolcsonController");

router.post("/login", userController.login)
router.post("/reg", userController.reg)
router.get("/logout/:id", userController.logout)
router.post("/user/:id", userController.userUpdate)
router.get("/user/:id", userController.userGet)

router.get("/torol/:id", userController.torol)

router.post("/ugyfel/:id", ugyfelController.ugyfelAdd);
router.get("/allUgyfel/:id", ugyfelController.allUgyfel);
router.post("/updateUgyfel/:id", ugyfelController.updateUgyfel)

router.post("/car/:id", carController.carAdd);
router.get("/autoszam/:id", carController.autoSzam);
router.get("/foglalszam/:id", carController.foglalSzam)
router.get("/autok/:id", carController.autok);
router.get("/allCar/:id", carController.allCar);
router.post("/updateCar/:id", carController.updateCar)

router.get("/autok_foglal/:id", kolcsonController.autok_foglal);
router.post("/fizetes/:id", kolcsonController.fizetes);
router.post("/newKolcson/:id", kolcsonController.getNewKolcson)




module.exports = router;