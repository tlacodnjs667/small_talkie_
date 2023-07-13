const { talkieDataSource } = require("./talkieDataSource");

const getTalkieCard = (isUser, offset = 0, user_id) => {
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

const getBookmarkedTalkies = (user_id) => {
	return talkieDataSource.query(`
    SELECT
      id,
      talk,
      emoji
    FROM small_talks
    LEFT JOIN saved_questions ON saved_questions.talk_id = small_talks.id
    WHERE saved_questions.user_id = ${user_id}
  `);
};

const checkBookmarkById = (bookmark_id) => {
	return talkieDataSource.query(`
    SELECT 
      id,
      user_id
    FROM saved_questions
    WHERE id = ${bookmark_id}
  `);
};

const checkBookmarkByUserAndTalkie = (talkie_id, user_id) => {
	return talkieDataSource.query(`
    SELECT 
      id
    FROM saved_questions
    WHERE talk_id = ${talkie_id} AND user_id = ${user_id}
  `);
};

const bookmarkTalkie = (talkie_id, user_id) => {
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

const deleteBookmark = (bookmark_id) => {
	return talkieDataSource.query(`
      DELETE FROM saved_questions
      WHERE id = ${bookmark_id}
  `);
};

// 고민이 필
const getTalkieCardByEncounter = (mode, encounter_id, start = 0, user_id) => {
	const QueryByMode = {
		GUEST: `
      SELECT
        encounter_category.id AS encounter_id,
        encounter,
        encounter_category.emoji AS encounter_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", small_talks.id,
            "talkie", talk,
            "talkie_emoji", small_talks.emoji
          )
        ) AS talkies
      FROM encounter_category
      LEFT JOIN encounter_talk ON encounter_category.id = encounter_talk.encounter_id
      LEFT JOIN small_talks ON encounter_talk.talk_id = small_talks.id
      WHERE encounter_category.id = ${encounter_id}
      GROUP BY encounter_category.id
      LIMIT 7 OFFSET ${start};
  `,
		USER: `
      SELECT
        encounter_category.id AS encounter_id,
        encounter,
        encounter_category.emoji AS encounter_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", small_talks.id,
            "talkie", talk,
            "talkie_emoji", small_talks.emoji,
            "isSaved", IFNULL(0, 1)
          )
        ) AS talkies
      FROM encounter_category
      LEFT JOIN encounter_talk ON encounter_category.id = encounter_talk.encounter_id
      LEFT JOIN small_talks ON small_talks.id = encounter_talk.talk_id
      LEFT JOIN saved_questions  ON saved_questions.talk_id = small_talks.id AND user_id = ${user_id}
      WHERE encounter_category.id = ${encounter_id}
      GROUP BY encounter_category.id
      LIMIT 7 OFFSET ${start};
    `,
	};

	return talkieDataSource.query(QueryByMode[mode]);
};

const getTalkieCardByTopic = (mode, topic_id, start, user_id) => {
	const QueryByMode = {
		GUEST: `
      SELECT
        topic_category.id AS topic_id,
        topic_category.topic,
        topic_category.emoji AS topic_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", small_talks.id,
            "talkie", talk,
            "talkie_emoji", small_talks.emoji
          )
        ) AS talkies
      FROM topic_category
      LEFT JOIN topic_talk ON topic_category.id = topic_talk.topic_id
      LEFT JOIN small_talks ON small_talks.id = topic_talk.talk_id
      WHERE topic_category.id = ${topic_id}
      GROUP BY topic_category.id
      LIMIT 7 OFFSET ${start}
    `,
		USER: `
      SELECT 
      topic_category.id AS topic_id,
      topic_category.topic,
      topic_category.emoji AS topic_emoji,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "talkie_id", small_talks.id,
          "talkie", talk,
          "talkie_emoji", small_talks.emoji,
          "isSaved", IFNULL(0, 1)
        )
      ) AS talkies
      FROM topic_category
      LEFT JOIN topic_talk ON topic_category.id = topic_talk.topic_id
      LEFT JOIN small_talks ON small_talks.id = topic_talk.talk_id
      LEFT JOIN saved_questions ON small_talks.id = saved_questions.talk_id AND user_id = ${user_id}
      WHERE topic_category.id = ${topic_id}
      GROUP BY topic_category.id
      LIMIT 7 OFFSET ${start}
    `,
	};

	return talkieDataSource.query(QueryByMode[mode]);
};

module.exports = {
	getTalkieCard,
	getBookmarkedTalkies,
	checkBookmarkById,
	checkBookmarkByUserAndTalkie,
	bookmarkTalkie,
	deleteBookmark,
	getTalkieCardByEncounter,
	getTalkieCardByTopic,
};
