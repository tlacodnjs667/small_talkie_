const talkieDao = require("../models/talkieDao");
const categoryDao = require("../models/categoryDao");

const getTalkieCard = (isUser, user_id, offset) => {
	const StrategyByMode = {
		USER: async (isUser, offset, user_id) => {
			const data = await talkieDao.getTalkieCard(isUser, offset, user_id);
			return data;
		},
		GUEST: async (isUser, offset) => {
			const data = await talkieDao.getTalkieCard(isUser, offset);
			return data;
		},
	};

	return StrategyByMode[isUser](isUser, offset, user_id);
};

const getBookmarkedTalkies = async (user_id) => {
	return talkieDao.getBookmarkedTalkies(user_id);
};

const bookmarkTalkie = async (talkie_id, user_id) => {
	const checkDuplicateBookmark = await talkieDao.checkBookmarkByUserAndTalkie(
		talkie_id,
		user_id
	);

	if (checkDuplicateBookmark.length) {
		const err = new Error("ALREDY_BOOKMARKED_TALKIE");
		err.statusCode = 409;
		throw err;
	}

	return talkieDao.bookmarkTalkie(talkie_id, user_id);
};

const deleteBookmark = async (bookmark_id, user_id) => {
	const checkBookmark = await talkieDao.checkBookmarkById(bookmark_id);

	if (!checkBookmark.length) {
		const error = new Error(
			"THIS_BOOKMARK_HAS_ALREADY_BEEN_DELETED_OR_CANNOT_BE_FOUND"
		);
		error.statusCode = 404;
		throw error;
	}

	if (checkBookmark[0].user_id != user_id) {
		const err = new Error("THIS_BOOKMARK_IS_OWNED_BY_SOMEONE_ELSE");
		err.statusCode = 403;
		throw err;
	}

	return talkieDao.deleteBookmark(bookmark_id);
};

const getTalkieCardByEncounter = async (mode, user_id, encounter_id) => {
	const data = await talkieDao.getTalkieCardByEncounter(
		mode,
		user_id,
		encounter_id
	);

	return data;
};

const getTalkieCardByTopic = async (mode, user_id, topic_id) => {
	const talkie = talkieDao.getTalkieCardByTopic(mode, user_id, topic_id);

	const topics = await categoryDao.getTopicCategory();
};

module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	bookmarkTalkie,
	deleteBookmark,
	getTalkieCardByEncounter,
	getTalkieCardByTopic,
};
