const { talkieDataSource } = require("./talkieDataSource");

const getTopics = (condition, start = 0) => {
	/**
	 * CONDITION [SIGN_UP, LIST] 에 따라 반환하는 정보 다르게 처리
	 * 1. Sign_up 상황에서 사용할 경우, start 인자를 포함하여 요청 보낼 수 있음. 없을 경우 초기값 0
	 * 2. LIST 상황에서 사용할 경우에는,
	 */
	const queryByCondition = {
		SIGN_UP: ["", `LIMIT 7 OFFSET ${start}`],
		LIST: [
			`, COUNT(topic_id) AS checkInterest`,
			`LEFT JOIN user_interest ON user_interest.topic_id = topic_category.id
      GROUP BY topic_category
      ORDER BY checkInterest DESC, topic ASC
    `,
		],
	};

	return talkieDataSource.query(`
      SELECT
        id, 
        topic,
        emoji
        ${queryByCondition[condition][0]}
      FROM topic_category
      ${queryByCondition[condition][1]}
  `);
};

const getInterestCategoryByUserOrTopic = (condition, id1, id2) => {
	/*  ** 매개 변수 : condition - ENUM["ALL", "USER", "TOPIC"]
    * 사용 상황 1. user_id 조건 이용하는 경우 
      categoryDao.getInterestCategoryByUserOrTopic("USER", user_id)
      
    * 사용 상황 2. topic_id 조건 이용하는 경우 
      categoryDao.getInterestCategoryByUserOrTopic("TOPIC", topic_id)

    * 사용 상황 3. user_id와 topic_id 조건 모두 이용하는 경우 
      categoryDao.getInterestCategoryByUserOrTopic("ALL", user_id, topic_id)
      ** 토픽 id 값이 항상 후위
  */

	const whereCla = Object.freeze({
		ALL: `WHERE user_id = ${id1} AND topic_id = ${id2}`,
		USER: `WHERE user_id = ${id1}`,
		TOPIC: `WHERE topic_id = ${id1}`,
	});

	return talkieDataSource.query(`
    SELECT
      topic_id,
      topic,
      emoji
    FROM user_interest
    LEFT JOIN topic_category ON topic_category.id = topic_id
    ${whereCla[condition]}
  `);
};

const insertInterest = (user_id, topic_id) => {
	return talkieDataSource.query(`
    INSERT INTO user_interest (
      user_id,
      topic_id
    ) VALUES (
      ${user_id},
      ${topic_id}
    )
  `);
};

const deleteInterest = (user_id, topic_id) => {
	return talkieDataSource.query(`
    DELETE FROM user_interest
    WHERE user_id = ${user_id} AND topic_id = ${topic_id}
  `);
};

const getSituationCategoryList = () => {
	return talkieDataSource.query(`
    SELECT 
      id,
      situation,
      emoji
    FROM situation_category
    `);
};

const getEncounterCategoryListBySituation = (situation_id) => {
	return talkieDataSource.query(`
    SELECT 
      situation_category.id,
      situation,
      situation_category.emoji,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "encounter_id", encounter_category.id,
          "encounter", encounter,
          "encounter_emoji", encounter_category.emoji
        ) 
      ) AS encounters
    FROM situation_category
    LEFT JOIN encounter_category ON situation_category.id = encounter_category.situation_id
    WHERE situation_category.id = ${situation_id}
  `);
};

module.exports = {
	getTopics,
	getInterestCategoryByUserOrTopic,
	insertInterest,
	deleteInterest,
	getSituationCategoryList,
	getEncounterCategoryListBySituation,
};
