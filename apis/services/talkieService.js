const talkieDao = require("../models/talkieDao");

const getTalkieCard = async (isUser, user_id, offset) => {
	const StrategyByMode = {
		USER: async (isUser, offset, user_id) => {
			const message = "TALKIE_CARDS_FOR_GUEST_HAVE_BEEN_LOADED";
			const data = await talkieDao.getTalkieCard(isUser, offset, user_id);

			return { message, data };
		},
		GUEST: async (isUser, offset) => {
			const message = "TALKIE_CARDS_FOR_USER_HAVE_BEEN_LOADED";
			const data = await talkieDao.getTalkieCard(isUser, offset);

			return { message, data };
		},
	};

	return StrategyByMode[isUser](isUser, offset, user_id);
};

const bookemarkTalkie = async (talkie_id, user_id) => {
	const checkDuplicateBookmark = await talkieDao.checkBookmarkByUserAndTalkie(
		talkie_id,
		user_id
	);

	if (checkDuplicateBookmark.length) {
		const err = new Error("ALREDY_BOOKMARKED_TALKIE");
		err.statusCode = 409;
		throw err;
	}

	return talkieDao.bookemarkTalkie(talkie_id, user_id);
};

module.exports = { getTalkieCard, bookemarkTalkie };
