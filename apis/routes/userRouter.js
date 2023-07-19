const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const AuthMiddleware = require("../utils/authMiddleware");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.patch("", AuthMiddleware, userController.modifyDarkmode);
router.get("", AuthMiddleware, userController.getUserInfo);

module.exports = router;
