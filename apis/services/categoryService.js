const categoryDao = require("../models/categoryDao");

const getTopicsForSignUp = (start) => {
	return categoryDao.getTopicsForSignUp(start);
};

const getInterestCategory = async (user_id) => {
	const data = await categoryDao.getInterestCategory(user_id);

	if (data.length) {
		return {
			status: 200,
			data,
		};
	} else return { status: 204 };
};

const modifyUserInterest = async () => {};

module.exports = {
	getTopicsForSignUp,
	getInterestCategory,
	modifyUserInterest,
};
