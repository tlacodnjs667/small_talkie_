const { talkieDataSource } = require("./talkieDataSource");

const getTopicsForSignUp = (start = 0) => {
	return talkieDataSource.query(`
      SELECT
        topic_id, 
        topic,
        topic_emoji
      FROM topic_category
      ORDER BY topic
      LIMIT 7 OFFSET ${start}
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
		ALL: `WHERE user_fk = ${id1} AND topic_fk = ${id2}`,
		USER: `WHERE user_fk = ${id1}`,
		TOPIC: `WHERE topic_fk = ${id1}`,
	});

	return talkieDataSource.query(`
    SELECT
      topic_id,
      topic,
      topic_emoji
    FROM user_interest
    LEFT JOIN topic_category ON topic_id = topic_fk
    ${whereCla[condition]}
  `);
};

const insertInterest = (user_id, topic_id) => {
	return talkieDataSource.query(`
    INSERT INTO user_interest (
      user_fk,
      topic_fk
    ) VALUES (
      ${user_id},
      ${topic_id}
    )
  `);
};

const deleteInterest = (user_id, topic_id) => {
	return talkieDataSource.query(`
    DELETE FROM user_interest
    WHERE user_fk = ${user_id} AND topic_fk = ${topic_id}
  `);
};

const getSituationCategoryList = () => {
	return talkieDataSource.query(`
    SELECT 
      situation_id,
      situation,
      situation_emoji
    FROM situation_category
    `);
};

const getEncounterCategoryListBySituation = (situation_id) => {
	return talkieDataSource.query(`
    SELECT 
      situation_id,
      situation,
      situation_emoji,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "encounter_id", encounter_id,
          "encounter", encounter,
          "encounter_emoji", encounter_emoji
        ) 
      ) AS encounters
    FROM situation_category
    LEFT JOIN encounter_category ON situation_id = situation_fk
    WHERE situation_id = ${situation_id}
  `);
};

const getTopicCategory = (mode, user_id) => {
	const QueryDiversityByMode = {
		GUEST: `
    SELECT
      topic_id,
      topic,
      topic_emoji
    FROM topic_category
    ORDER BY topic ASC
  `,
		USER: `
      SELECT
        topic_id,
        topic,
        topic_emoji,
        IF(IS NULL(user_fk), 0, 1) AS interest_check
      FROM topic_category
      LEFT JOIN user_interest 
        ON user_fk = ${user_id} AND topic_fk = topic_id
      ORDER BY InterestCheck DESC, topic ASC
      `,
		RECOMMEND: `
      SELECT
        topic_id,
        topic,
        topic_emoji,
        COUNT(interest_id) AS interestedCnt
      FROM topic_category
      LEFT JOIN user_interest ON topic_fk = topic_id
      GROUP BY topic_id
      ORDER BY interestedCnt DESC, topic ASC
      LIMIT 5 OFFSET ${Math.floor(Math.random() * 20)}
    `,
	};

	return talkieDataSource.query(QueryDiversityByMode[mode]);
};

module.exports = {
	getTopicsForSignUp,
	getInterestCategoryByUserOrTopic,
	insertInterest,
	deleteInterest,
	getSituationCategoryList,
	getEncounterCategoryListBySituation,
	getTopicCategory,
};
