const { talkieDataSource } = require("./talkieDataSource");

/*
  profile 내 유저 정보
	 * nickname
	 * thumbnail_image_url
	 * profile_image_url
	 * is_default_image
*/

const checkDuplicated = (kakao_client_id) => {
	return talkieDataSource.query(`
    SELECT
      id
    FROM users
    WHERE checkDuplicated = ${kakao_client_id}
  `).length
		? true
		: false;
};

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

module.exports = { checkDuplicated, signup, addUserInterest };
