const categoryDao = require("../models/categoryDao");

const CONDITION_ENUM = Object.freeze({
	TOPIC: "TOPIC",
	USER: "USER",
	ALL: "ALL",
});

const getTopicsForSignUp = (start) => {
	return categoryDao.getTopicsForSignUp(start);
};

const getInterestCategory = async (user_id) => {
	const result = {
		status: null,
		data: null,
	};

	result.data = await categoryDao.getInterestCategoryByUserOrTopic(
		CONDITION_ENUM.USER,
		user_id
	);

	if (result.data.length) result.status = 200;
	else result.status = 204;

	return result;
};

const modifyUserInterest = async (user_id, topic_id) => {
	const result = {
		status: null,
		message: null,
	};

	const checkUserInterest = await categoryDao.getInterestCategoryByUserOrTopic(
		CONDITION_ENUM.ALL,
		user_id,
		topic_id
	);

	if (checkUserInterest.length) {
		await categoryDao.deleteInterest(user_id, topic_id);

		result.status = 204;
	} else {
		const checkUserInterestCNT =
			await categoryDao.getInterestCategoryByUserOrTopic(
				CONDITION_ENUM.USER,
				user_id
			);

		if (checkUserInterestCNT.length == 5) {
			const err = new Error("EXCEEDED_MAXIMUM_SIZE");
			err.statusCode = 400;
			throw err;
		}

		await categoryDao.insertInterest(user_id, topic_id);

		result.status = 201;
		result.message = "INTEREST_CATEGORY_CREATED";
	}

	return result;
};

module.exports = {
	getTopicsForSignUp,
	getInterestCategory,
	modifyUserInterest,
};
