const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const userDao = require("../models/userDao");

const signup = async (access_token, interest) => {
	const { kakao_client, kakao_account } = await getUserInfoFromKakao(
		access_token
	);

	const [checkDuplicated] = await userDao.getUserInfo("KAKAO_ID", kakao_client);

	if (checkDuplicated) {
		const authorization = jwt.sign(
			{ ...checkDuplicated },
			process.env.JWT_SECRET_KEY
		);
		const message = "ALREADY_IN_SERVICE";
		return { message, authorization };
		// 로그인 프로세스로 전환
	}

	const userPropertiesOfSmallTalkie = [
		"kakao_client",
		"nickname",
		"email",
		"profile_image_url",
	];

	const queryBuildToValue = {
		kakao_client,
		nickname: kakao_account.profile.nickname,
		email: kakao_account.email,
		profile_image_url: kakao_account.profile.profile_image_url,
	};

	const valid_user_properties = userPropertiesOfSmallTalkie.filter(
		(el) => queryBuildToValue[el]
	);

	const valid_user_properties_value = valid_user_properties.map(
		(el) => queryBuildToValue[el]
	);

	const { insertId } = await userDao.signup(
		valid_user_properties.join(", "),
		valid_user_properties_value.join('", "')
	);

	const queryBuildForInterest = interest
		.map((el) => `( ${insertId} , ${el} )`)
		.join(", ");

	userDao.addUserInterest(queryBuildForInterest);

	const authorization = jwt.sign(
		{
			user_id: insertId,
			nickname: kakao_account.profile.nickname,
		},
		process.env.JWT_SECRET_KEY
	);

	const message = "USER_CREATED";

	return { message, authorization };
};

const signin = async (access_token) => {
	const { kakao_client } = await getUserInfoFromKakao(access_token);

	const [AccountInfo] = await userDao.getUserInfo("KAKAO_ID", kakao_client);

	if (!AccountInfo) {
		const error = new Error("SIGNUP_REQUIRED");
		error.statusCode = 401;
		throw error;
	}

	const authorization = jwt.sign(
		{ ...AccountInfo },
		process.env.JWT_SECRET_KEY
	);

	return {
		authorization,
		darkmode: AccountInfo.darkmode,
	};
	// 회원 정보 수정에 관한 결정 여부
};

const getUserInfo = async (user_id) => {
	const [data] = await userDao.getUserInfo("APP_ID", user_id);

	return data;
};

const modifyDarkmode = async (user_id) => {
	const [current] = await userDao.getUserInfo("APP_ID", user_id);
	const modeToChange = { 1: 0, 0: 1 };
	// MODEL에 유저 데이터 정보 변경 요청할 때 쓰이는 데이터
	// 1이 다크모드, 0이 라이트 모드

	const MODE_ENUM = Object.freeze({
		1: "DARK",
		0: "LIGHT",
	});

	// CONTROLLER로 어떤 모드로 전환되었는 지에 관한 정보를 주기 위한 데이터

	await userDao.modifyDarkmode(user_id, modeToChange[current.darkmode]);

	return MODE_ENUM[modeToChange[current.darkmode]];
};

module.exports = { signup, signin, getUserInfo, modifyDarkmode };

const getUserInfoFromKakao = async (access_token) => {
	const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
		},
	});

	const { id: kakao_client, kakao_account } = result.data;
	return { kakao_client, kakao_account };
};

// 모듈화 위해, 로그인 시 kakao_client_id 만 가져오고, 회원가입 시
