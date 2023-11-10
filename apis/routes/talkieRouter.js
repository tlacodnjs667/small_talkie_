const express = require("express");
const router = express.Router();

const talkieController = require("../controllers/talkieController");
const AuthMiddleware = require("../utils/authMiddleware");

router.get("/bookmark", AuthMiddleware, talkieController.getBookmarkedTalkies);
router.get("",  talkieController.getTalkieCard);

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

router.get(
	"/encounter/:encounter_id",
	AuthMiddleware,
	talkieController.getTalkieCardByEncounter
);

router.get(
	"/topic/:topic_id",
	AuthMiddleware,
	talkieController.getTalkieCardByTopic
);

module.exports = router;
