const { talkieDataSource } = require("./talkieDataSource");

/*
  profile 내 유저 정보
	 * nickname
	 * thumbnail_image_url
	 * profile_image_url
	 * is_default_image
*/

// 유저 정보 접근하는 함수들 모듈화 가능여부 생각해보기.
const checkDuplicated = (kakao_client_id) => {
	return talkieDataSource.query(`
    SELECT
      id
    FROM users
    WHERE kakao_client = ${kakao_client_id}
  `).length
		? true
		: false;
};

const getUserInfo = (mode, id) => {
	const queryByMode = {
		KAKAO_ID: `
      SELECT
        user_id,
        nickname
      FROM users
      WHERE kakao_client = ${id}
      `,
		APP_ID: `
      SELECT
        nickname,
        email,
        darkmode,
        profile_image_url
      FROM users
      WHERE user_id = ${id}
    `,
	};

	return talkieDataSource.query(queryByMode[mode]);
}; //nickname

// 여기까지

const signup = (
	kakao_client_id,
	queryBuildToUserProperty,
	queryBuildToUserValue
) => {
	return talkieDataSource.query(`
    INSERT INTO users (
      kakao_client
      ${queryBuildToUserProperty}
    ) VALUES (
      ${kakao_client_id}
      ${queryBuildToUserValue}
    );
  `);
};

const addUserInterest = (interestQuery) => {
	return talkieDataSource.query(`
    INSERT INTO user_interest (
      user_id,
      topic_id
    ) VALUES ${interestQuery}
  `);
};

module.exports = { checkDuplicated, getUserInfo, signup, addUserInterest };
