const { talkieDataSource } = require("./talkieDataSource");

const getTalkieCard = (isUser, offset, user_id) => {
	const QueryToGetTalkie = {
		USER: ` 
      SELECT 
        small_talks.id,
        talk,
        emoji
      FROM small_talks
      LEFT JOIN topic_talk ON topic_talk.talk_id = small_talks.id
      LEFT JOIN topic_category ON topic_category.id = topic_talk.topic_id
      LEFT JOIN user_interest ON user_interest.topic_id = topic_category.id
      WHERE user_id = ${user_id}
      LIMIT 7 OFFSET ${offset}
    `,
		GUEST: `
      (
        SELECT 
          small_talks.id,
          talk,
          emoji,
          COUNT(saved_questions.id) AS fans
        FROM small_talks
        LEFT JOIN saved_questions ON saved_questions.talk_id = small_talks.id
        GROUP BY small_talks.id
        ORDER BY fans DESC
        LIMIT 40 OFFSET 0
      )
      ORDER BY RAND()
      LIMIT 7 OFFSET ${offset}
    `,
	};

	return talkieDataSource.query(QueryToGetTalkie[isUser]);
};

const checkBookmarkByUserAndTalkie = (talkie_id, user_id) => {
	return talkieDataSource.query(`
    SELECT 
      id
    FROM saved_questions
    WHERE talk_id = ${talkie_id} AND user_id = ${user_id}
  `);
};

const bookemarkTalkie = (talkie_id, user_id) => {
	return talkieDataSource.query(`
    INSERT INTO saved_questions (
      talk_id, 
      user_id
    ) VALUES (
      ${talkie_id},
      ${user_id}
    );
  `);
};

module.exports = {
	getTalkieCard,
	checkBookmarkByUserAndTalkie,
	bookemarkTalkie,
};
