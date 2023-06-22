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

module.exports = { getTalkieCard };
