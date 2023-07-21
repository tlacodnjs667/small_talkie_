const talkieDao = require("../models/talkieDao");
const categoryDao = require("../models/categoryDao");

const getTalkieCard = async (is_user, offset, user_id) => {
	return talkieDao.getTalkieCard(is_user, offset, user_id);
};

const getBookmarkedTalkies = async (user_id) => {
	return talkieDao.getBookmarkedTalkies(user_id);
};

const bookmarkTalkie = async (talkie_id, user_id) => {
	const checkDuplicateBookmark = await talkieDao.checkBookmarkByUserAndTalkie(
		talkie_id
	);

	if (checkDuplicateBookmark.length) {
		const err = new Error("ALREDY_BOOKMARKED_TALKIE");
		err.statusCode = 409;
		throw err;
	}

	return talkieDao.bookmarkTalkie(talkie_id, user_id);
};

const deleteBookmark = async (bookmark_id, user_id) => {
	const checkBookmark = await talkieDao.checkBookmarkById(bookmark_id, user_id);

	if (!checkBookmark.length) {
		const error = new Error(
			"THIS_BOOKMARK_HAS_ALREADY_BEEN_DELETED_OR_CANNOT_BE_FOUND"
		);
		error.statusCode = 404;
		throw error;
	}

	if (checkBookmark[0].user_fk != user_id) {
		const err = new Error("THIS_BOOKMARK_IS_OWNED_BY_SOMEONE_ELSE");
		err.statusCode = 403;
		throw err;
	}

	return talkieDao.deleteBookmark(bookmark_id);
};

const getTalkieCardByEncounter = async (mode, encounter_id, start, user_id) => {
	const data = await talkieDao.getTalkieCardByEncounter(
		mode,
		encounter_id,
		start,
		user_id
	);

	return data;
};

const getTalkieCardByTopic = async (mode, topic_id, start, user_id) => {
	const topics = await categoryDao.getTopicCategory("RECOMMEND");
	const [talkie] = await talkieDao.getTalkieCardByTopic(
		mode,
		topic_id,
		start,
		user_id
	);

	return { topics, talkie };
};
module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	bookmarkTalkie,
	deleteBookmark,
	getTalkieCardByEncounter,
	getTalkieCardByTopic,
};
