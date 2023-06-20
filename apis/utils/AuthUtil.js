const jwt = require("jsonwebtoken");

export default class AuthUtil {
	static __sign_token(Account) {
		return jwt.sign(Account, process.env.JWT_SECRET_KEY);
	}

	static __verify_token(token) {
		if (!token) {
			const err = new Error("CANNOT_FIND_TOKEN");

			err.statusCode = 404;
			throw err;
		}

		const account = jwt.verify(token, process.env.JWT_SECRET_KEY);
		return account;
	}
}
