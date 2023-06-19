const { catchAsync } = require("../utils/globalErrorHandler");

const signup = catchAsync((req, res) => {
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

	const result = userService.signup(access_token, interest);

	res.status(201).json({ message: "USER_CREATED", result });
});

module.exports = { signup };
