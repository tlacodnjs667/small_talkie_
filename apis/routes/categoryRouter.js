const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/signup", categoryController.getTopicsForSignUp);
router.get("/interest", categoryController.getInterestCategory);
router.put("/interest", categoryController.modifyUserInterest);

module.exports = router;
