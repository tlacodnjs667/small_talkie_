const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const AuthMiddleware = require("../utils/authMiddleware");

router.get("/signup", categoryController.getTopicsForSignUp);
router.get("/interest", AuthMiddleware, categoryController.getInterestCategory);
router.put("/interest", AuthMiddleware, categoryController.modifyUserInterest);

module.exports = router;
