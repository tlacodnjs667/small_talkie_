const { default: axios } = require("axios");

const signup = async (access_token, interest) => {
	const result = getUserInfoFromKakao(access_token);

	const { kakao_client_id, profile } = result;

	const isSavedUser = await userDao.checkDuplicated(kakao_client_id);

	if (isSavedUser) {
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

	return insertId;
};

module.exports = { signup };

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
