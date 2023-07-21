const { catchAsync } = require("./globalErrorHandler");
const jwt = require("jsonwebtoken");

const AuthMiddleware = catchAsync(async (req, res, next) => {
	const { is_user = "USER" } = req.headers;

	await AuthenticationByMode[is_user](req);
	next();
});

const AuthenticationByMode = {
	/**
	 * @param {*} access_token
	 * access_token : { user_id, nickname }
	 */
	USER: (req) => {
		console.log("USER_ENTERED");

		if (!req.headers.access_token) {
			const err = new Error("CANNOT_FIND_TOKEN");
			err.statusCode = 404;
			throw err;
		}

		const user = jwt.verify(
			req.headers.access_token,
			process.env.JWT_SECRET_KEY
		);

		req.user = user;
		return;
	},

	GUEST: () => {
		console.log("GUEST_ENTERED");
	},
};

module.exports = AuthMiddleware;
