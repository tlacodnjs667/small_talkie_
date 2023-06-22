const { catchAsync } = require("../utils/globalErrorHandler");
const talkieService = require("../services/talkieService");

const getTalkieCard = catchAsync((req, res) => {
	const { user } = req;
	const { offset } = req.query;
	const { isUser } = req.headers;

	const data = talkieService.getTalkieCard[isUser](
		isUser,
		offset,
		user.id ? user.id : null
	);

	const statusCode = data.data ? 200 : 204;

	res.status(statusCode).json(data);
});

const getBookmarkedTalkies = async (req, res) => {
	const { id: user_id } = req.user;

	const data = await talkieService.getBookmarkedTalkies(user_id);

	res.status(200).json(data);
};

const bookmarkTalkie = async (req, res) => {
	const { talkie_id } = req.params;
	const { user } = req;

	if (!talkie_id) {
		const error = new Error("TALKIE_DATA_REQUIRED");
		error.statusCode = 400;
		throw error;
	}

	const { insertId } = await talkieService.bookmarkTalkie(talkie_id, user.id);

	res.status(201).json({ message: "BOOKMARK_CREATED" });
};

const deleteBookmark = async (req, res) => {
	const { bookmark_id } = req.params;
	const { user } = req;

	if (!bookmark_id) {
		const error = new Error("BOOKMARK_DATA_REQUIRED");
		error.statusCode = 400;
		throw error;
	}

	await talkieService.deleteBookmark(bookmark_id, user.id);

	res.status(204).json({ message: "BOOKMARK_HAS_BEEN_DELETED" });
};

module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	bookmarkTalkie,
	deleteBookmark,
};
