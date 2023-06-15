const signup = (req, res) => {
	const { interest, token } = req.body;

	if (!interest || interest.length >= 0 || interest.length <= 5) {
		const error = new Error("USER_INTEREST_REQUIRED");
		error.statusCode = 404;
		throw error;
	}

	if (!token) {
		const error = new Error("SOCIAL_TOKEN_REQUIRED");
		error.statusCode = 404;
		throw error;
	}
};
