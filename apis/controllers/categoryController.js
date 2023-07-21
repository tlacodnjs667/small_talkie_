const categoryService = require("../services/categoryService");
const { catchAsync } = require("../utils/globalErrorHandler");

const getTopicsForSignUp = catchAsync(async (req, res) => {
	const data = await categoryService.getTopicsForSignUp();

	res.status(200).json({ data });
});

const getInterestCategory = catchAsync(async (req, res) => {
	const { user_id } = req.user;

	const { status, data } = await categoryService.getInterestCategory(user_id);

	res.status(status).json({ message: "DATA_LOADED", data });
});

const modifyUserInterest = catchAsync(async (req, res) => {
	const { user_id } = req.user;
	const { topic_id } = req.body;

	const { status, message } = await categoryService.modifyUserInterest(
		user_id,
		topic_id
	);

	res.status(status).json({ message });
});

const getSituationCategoryList = catchAsync(async (req, res) => {
	const data = await categoryService.getSituationCategoryList();
	res.status(200).json({ data });
});

const getEncounterCategoryListBySituation = catchAsync(async (req, res) => {
	const { situation_id } = req.params;
	const [data] = await categoryService.getEncounterCategoryListBySituation(
		situation_id
	);
	res.status(200).json({ data });
});

const getTopicCategory = catchAsync(async (req, res) => {
	const { is_user } = req.headers;

	const data = await categoryService.getTopicCategory(
		is_user,
		req.user ? req.user.user_id : 0
	);

	res.status(200).json({ data });
});

module.exports = {
	getTopicsForSignUp,
	getInterestCategory,
	modifyUserInterest,
	getSituationCategoryList,
	getEncounterCategoryListBySituation,
	getTopicCategory,
};
