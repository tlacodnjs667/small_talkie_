const { default: AuthUtil } = require("./AuthUtil");
const { catchAsync } = require("./globalErrorHandler");

const authorizeUserOrGuest = catchAsync((req, res, next) => {
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

module.exports = { authorizeUserOrGuest };
