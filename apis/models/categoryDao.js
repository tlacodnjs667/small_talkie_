const { talkieDataSource } = require("./talkieDataSource");

const getTopicsForSignUp = (start = 0) => {
	return talkieDataSource.query(`
      SELECT
        id, 
        topic
      FROM topic_category
      LIMIT 10 OFFSET ${start}
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

	const whereCla = {
		ALL: `WHERE user_id = ${id1} AND topic_id = ${id2}`,
		USER: `WHERE user_id = ${id1}`,
		TOPIC: `WHERE topic_id = ${id1}`,
	};

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

module.exports = {
	getTopicsForSignUp,
	getInterestCategoryByUserOrTopic,
	insertInterest,
	deleteInterest,
};
