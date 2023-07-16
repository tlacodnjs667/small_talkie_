const { catchAsync } = require("./globalErrorHandler");
const jwt = require("jsonwebtoken");

const AuthMiddleware = catchAsync(async (req, res, next) => {
	const { access_token, isUser = "USER" } = req.headers;

	await AuthenticationByMode[isUser](access_token);
	next();
});

const AuthenticationByMode = {
	/**
	 * @param {*} access_token
	 * access_token : { user_id, nickname }
	 */
	USER: (access_token) => {
		console.log("USER_ENTERED");

		if (!access_token) {
			const err = new Error("CANNOT_FIND_TOKEN");
			err.statusCode = 404;
			throw err;
		}

		const user = jwt.verify(access_token, process.env.JWT_SECRET_KEY);

		req.user = user;
	},

	GUEST: () => {
		console.log("GUEST_ENTERED");
	},
};

module.exports = AuthMiddleware;
