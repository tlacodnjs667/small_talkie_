const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const AuthMiddleware = require("../utils/authMiddleware");

router.get("/signup", categoryController.getTopicsForSignUp);

router.get("/interest", AuthMiddleware, categoryController.getInterestCategory);
// 전체 카테고리 리스트 볼 때, Interest 카테고리 5개 Lookup하는 API
router.patch(
	"/interest",
	AuthMiddleware,
	categoryController.modifyUserInterest
);

router.get("/situation", categoryController.getSituationCategoryList);
router.get(
	"/encounter/:situation_id",
	categoryController.getEncounterCategoryListBySituation
);

router.get("/topic", AuthMiddleware, categoryController.getTopicCategory);

module.exports = router;
