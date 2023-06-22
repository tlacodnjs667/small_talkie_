const router = require("express").Router();
const talkieController = require("../controllers/talkieController");
const { AuthMiddleware } = require("../utils/authMiddleware");

router.get(
	"",
	AuthMiddleware.authorizeUserOrGuest,
	talkieController.getTalkieCard
);

router.get(
	"/bookmark",
	AuthMiddleware.authorizeUser,
	talkieController.getBookmarkedTalkies
);

router.post(
	"/bookmark/:talkie_id",
	AuthMiddleware.authorizeUser,
	talkieController.bookmarkTalkie
);

router.delete(
	"/bookmark/:bookmark_id",
	AuthMiddleware.authorizeUser,
	talkieController.deleteBookmark
);

module.exports = router;
