const categoryDao = require("../models/categoryDao");

const getTopicsForSignUp = (start) => {
	return categoryDao.getTopicsForSignUp("SIGN_UP", start);
};

const getTopicCategory = async (user_id) => {
	const result = {
		status: null,
		data: null,
	};

	// user의 Interest category들이 상위로 가는 토픽 리스트 만들어야 함.
	result.data = await categoryDao.getTopics("LIST");
	return result;
};

const modifyUserInterest = async (user_id, topic_id) => {
	const result = {
		status: null,
		message: null,
	};

	const checkUserInterest = await categoryDao.getInterestCategoryByUserOrTopic(
		"ALL",
		user_id,
		topic_id
	);

	if (checkUserInterest.length) {
		await categoryDao.deleteInterest(user_id, topic_id);

		result.status = 204;
	} else {
		const checkUserInterestCNT =
			await categoryDao.getInterestCategoryByUserOrTopic("USER", user_id);

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

const getSituationCategoryList = () => {
	return categoryDao.getSituationCategoryList();
};

const getEncounterCategoryListBySituation = (situation_id) => {
	return categoryDao.getEncounterCategoryListBySituation(situation_id);
};

module.exports = {
	getTopicsForSignUp,
	getTopicCategory,
	modifyUserInterest,
	getSituationCategoryList,
	getEncounterCategoryListBySituation,
};
