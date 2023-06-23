const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const userDao = require("../models/userDao");

const signup = async (access_token, interest) => {
	const result = getUserInfoFromKakao(access_token);

	const { kakao_client_id, profile } = result;

	const [checkDuplicated] = await userDao.getUserInfo(kakao_client_id);

	if (checkDuplicated.length) {
		const authorization = jwt.sign(checkDuplicated, process.env.JWT_SECRET_KEY);
		const message = "ALREADY_IN_SERVICE";
		return { message, authorization };
		// 로그인 프로세스로 전환
	}

	const queryBuildToUserProperty = "";
	const queryBuildToUserValue = "";

	for ([property, value] in Object.entries(profile)) {
		if (value) {
			queryBuildToUserProperty += `, ${property}`;
			queryBuildToUserValue += `, ${value}`;
		}
	}

	const { insertId } = await userDao.signup(
		kakao_client_id,
		queryBuildToKey,
		queryBuildToValue
	);

	const queryBuildForInterest = interest
		.map((el) => `( ${insertId} , ${el} )`)
		.join(", ");

	userDao.addUserInterest(queryBuildForInterest);

	const authorization = jwt.sign(
		{
			id: insertId,
			nickname: profile.nickname,
		},
		process.env.JWT_SECRET_KEY
	);

	const message = "USER_CREATED";

	return { message, authorization };
};

AuthUtil;
const signin = async (access_token) => {
	const { kakao_client_id } = await getUserInfoFromKakao(access_token);

	const [AccountInfo] = await userDao.getUserInfo(kakao_client_id);

	if (!AccountInfo) {
		const error = new Error("SIGNUP_REQUIRED");
		error.statusCode = 401;
		throw error;
	}
	return jwt.sign(AccountInfo, process.env.JWT_SECRET_KEY);
	// 회원 정보 수정에 관한 결정 여부
};

module.exports = { signup, signin };

const getUserInfoFromKakao = async (access_token) => {
	const result = await axios.post("https://kapi.kakao.com/v2/user/me", {
		Headers: {
			Authorization: `Bearer ${access_token}`,
			"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
		},
	});

	const { id: kakao_client_id } = result;
	const { profile } = result.kakao_account;
	return { kakao_client_id, profile };
};

// 모듈화 위해, 로그인 시 kakao_client_id 만 가져오고, 회원가입 시
