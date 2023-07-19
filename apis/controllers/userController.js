const { catchAsync } = require("../utils/globalErrorHandler");
const userService = require("../services/userService");

const signup = catchAsync(async (req, res) => {
	const { access_token, interest } = req.body;

	if (!interest || interest.length >= 5) {
		const error = !interest
			? new Error("USER_INTEREST_REQUIRED")
			: new Error("EXCEED_MAXIMUM_INTEREST");
		error.statusCode = 404;
		throw error;
	}

	if (!access_token) {
		const error = new Error("SOCIAL_TOKEN_REQUIRED");
		error.statusCode = 404;
		throw error;
	}

	const data = await userService.signup(access_token, interest);

	res.status(201).json(data);
});

const signin = catchAsync(async (req, res) => {
	const { access_token } = req.body;

	if (!access_token) {
		const error = new Error("SOCIAL_TOKEN_REQUIRED");
		error.statusCode = 404;
		throw error;
	}

	const authorization = await userService.signin(access_token);

	res.status(200).json({ message: "LOGIN_SUCCESS", authorization });
});

const getUserInfo = catchAsync((req, res) => {
	const { user_id } = req.user;

	const data = userService.getUserInfo(user_id);

	res.status(200).json({ message: "", data });
});

module.exports = { signup, signin, getUserInfo };
