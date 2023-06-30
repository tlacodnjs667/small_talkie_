const categoryService = require("../services/categoryService");
const { catchAsync } = require("../utils/globalErrorHandler");

const getTopicsForSignUp = catchAsync((req, res) => {
	const { start } = req.query;

	const data = categoryService.getTopicsForSignUp(start);

	res.status(200).json({ data });
});

const getInterestCategory = catchAsync(async (req, res) => {
	const { id: user_id } = req.user;

	const { status, data } = await categoryService.getInterestCategory(user_id);

	res.status(status).json({ message: "DATA_LOADED", data });
});

const modifyUserInterest = catchAsync(async (req, res) => {
	const { id: user_id } = req.user;
	const { topic_id } = req.body;

	const result = await categoryService.modifyUserInterest(user_id, topic_id);

	res.status(result.status).json({ message: result.message });
});

module.exports = {
	getTopicsForSignUp,
	getInterestCategory,
	modifyUserInterest,
};
