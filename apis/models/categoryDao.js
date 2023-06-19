const { talkieDataSource } = require("./talkieDataSource");

const getTopicsForCategory = (start = 0) => {
	return talkieDataSource.query(`
      SELECT
        id, 
        topic
      FROM topic_category
      LIMIT 10 OFFSET ${start}
  `);
};

module.exports = { getTopicsForCategory };
