const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const AuthMiddleware = require("../utils/authMiddleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("", AuthMiddleware, userController.getUserInfo);
router.patch("/darkmode", AuthMiddleware, userController.modifyDarkmode);

module.exports = router;
