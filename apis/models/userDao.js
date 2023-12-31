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
      user_id
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
        nickname,
        darkmode
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

const signup = (Properties, Values) => {
	return talkieDataSource.query(`
    INSERT INTO users (
      ${Properties}
    ) VALUES (
      "${Values}"
    );
  `);
};

const addUserInterest = (interestQuery) => {
	return talkieDataSource.query(`
    INSERT INTO user_interest (
      user_id,
      topic_fk
    ) VALUES ${interestQuery}
  `);
};

const modifyDarkmode = (user_id, modeToChange) => {
	return talkieDataSource.query(`
    UPDATE users SET darkmode = ${modeToChange}
    WHERE user_id = ${user_id}
  `);
};

module.exports = {
	checkDuplicated,
	getUserInfo,
	signup,
	addUserInterest,
	modifyDarkmode,
};
