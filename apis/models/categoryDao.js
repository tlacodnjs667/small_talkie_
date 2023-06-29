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

const getInterestCategory = (user_id) => {
	return talkieDataSource.query(`
    SELECT
      topic_id,
      topic,
      emoji
    FROM user_interest
    LEFT JOIN topic_category ON topic_category.id = topic_id
    WHERE user_id = ${user_id}
  `);
};

module.exports = { getTopicsForSignUp, getInterestCategory };
