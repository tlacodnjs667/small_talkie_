const router = require("express").Router();
const talkieController = require("../controllers/talkieController");
const { AuthMiddleware } = require("../utils/authMiddleware");

router.get("", AuthMiddleware, talkieController.getTalkieCard);

router.get("/bookmark", AuthMiddleware, talkieController.getBookmarkedTalkies);

router.post(
	"/bookmark/:talkie_id",
	AuthMiddleware,
	talkieController.bookmarkTalkie
);

router.delete(
	"/bookmark/:bookmark_id",
	AuthMiddleware,
	talkieController.deleteBookmark
);

module.exports = router;
