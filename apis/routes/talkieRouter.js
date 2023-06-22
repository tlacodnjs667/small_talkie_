const router = require("express").Router();
const talkieController = require("../controllers/talkieController");
const { AuthMiddleware } = require("../utils/authMiddleware");

router.get(
	"",
	AuthMiddleware.authorizeUserOrGuest,
	talkieController.getTalkieCard
);

module.exports = router;
