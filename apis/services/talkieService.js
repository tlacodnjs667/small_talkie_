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

module.exports = { getTalkieCard };
