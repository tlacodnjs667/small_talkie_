const { default: AuthUtil } = require("./AuthUtil");
const { catchAsync } = require("./globalErrorHandler");

export class AuthMiddleware {
	static authorizeUser = catchAsync((req, res, next) => {
		const { access_token } = req.headers;

		if (!access_token) {
			const err = new Error("CANNOT_FIND_TOKEN");
			err.statusCode = 404;
			throw err;
		}

		const user = AuthUtil.__verify_token(access_token);

		req.user = user;
		next();
	});

	static authorizeUserOrGuest = catchAsync((req, res, next) => {
		const { access_token } = req.headers;

		if (!access_token) {
			req.headers.isUser = false;
			next();
			// Guest 처리
		}

		const user = AuthUtil.__verify_token(access_token);

		req.headers.isUser = true;
		req.user = user;
		// 회원 처리
		next();
	});
}
