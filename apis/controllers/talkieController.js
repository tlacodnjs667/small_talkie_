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

	res.status(200).json({ data });
});

const bookemarkTalkie = (req, res) => {
	const { talkie_id } = req.params;
	const { user } = req;

	if (!talkie_id) {
		const error = new Error("TALKIE_DATA_REQUIRED");
		error.statusCode = 400;
		throw error;
	}

	const { insertId } = talkieService.bookemarkTalkie(talkie_id, user.id);

	res.status(201).json({ message: "BOOKMARK_CREATED" });
};

module.exports = { getTalkieCard, bookemarkTalkie };
