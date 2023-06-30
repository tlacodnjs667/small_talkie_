const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const AuthMiddleware = require("../utils/authMiddleware");

router.get("/signup", categoryController.getTopicsForSignUp);

router.get("/interest", AuthMiddleware, categoryController.getInterestCategory);
router.put("/interest", AuthMiddleware, categoryController.modifyUserInterest);

router.get("/situation", categoryController.getSituationCategoryList);
router.get(
	"/encounter/:situation_id",
	categoryController.getEncounterCategoryListBySituation
);

module.exports = router;
