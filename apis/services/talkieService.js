const talkieDao = require("../models/talkieDao");

const getTalkieCard = async (isUser, user_id, offset) => {
	const StrategyByMode = {
		USER: async (isUser, offset, user_id) => {
			const data = await talkieDao.getTalkieCard(isUser, offset, user_id);
			const message = data
				? "TALKIE_CARDS_FOR_USER_HAVE_BEEN_LOADED"
				: "END_OF_INFORMATION_REACHED";

			return { message, data };
		},
		GUEST: async (isUser, offset) => {
			const data = await talkieDao.getTalkieCard(isUser, offset);
			const message = data
				? "TALKIE_CARDS_FOR_GUEST_HAVE_BEEN_LOADED"
				: "END_OF_INFORMATION_REACHED";

			return { message, data };
		},
	};

	return StrategyByMode[isUser](isUser, offset, user_id);
};

const getBookmarkedTalkies = async (user_id) => {
	return await talkieDao.getBookmarkedTalkies(user_id);
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

	talkieDao.deleteBookmark(bookmark_id);

	res.status(204).json({ message: "DELETION_COMPLETED_SUCCESSFULLY" });
};

module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	bookmarkTalkie,
	deleteBookmark,
};
