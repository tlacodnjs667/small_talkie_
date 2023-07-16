const { talkieDataSource } = require("./talkieDataSource");

const getTalkieCard = (isUser, offset = 0, user_id) => {
	const QueryToGetTalkie = {
		USER: ` 
      SELECT 
        small_talkies.talkie_id,
        talkie
      FROM small_talkies
      LEFT JOIN topic_talk ON topic_talk.talkie_fk = small_talkies.talkie_id
      LEFT JOIN topic_category ON topic_category.topic_id = topic_talk.topic_fk
      LEFT JOIN user_interest ON user_interest.topic_fk = topic_category.topic_id
      WHERE user_fk = ${user_id}
      LIMIT 7 OFFSET ${offset}
    `,
		GUEST: `
      (
        SELECT 
          small_talkies.talkie_id,
          talkie,
          COUNT(bookmarks.bookmark_id) AS fans
        FROM small_talkies
        LEFT JOIN bookmarks ON bookmarks.talkie_fk = small_talkies.talkie_id
        GROUP BY small_talkies.talkie_id
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
      talkie_id,
      talkie
    FROM small_talkies
    LEFT JOIN bookmarks ON bookmarks.talkie_fk = small_talkies.talkie_id
    WHERE bookmarks.user_fk = ${user_id}
  `);
};

const checkBookmarkById = (bookmark_id) => {
	return talkieDataSource.query(`
    SELECT 
      bookmark_id,
      user_fk
    FROM bookmarks
    WHERE bookmark_id = ${bookmark_id}
  `);
};

const checkBookmarkByUserAndTalkie = (talkie_id, user_id) => {
	return talkieDataSource.query(`
    SELECT 
      bookmark_id
    FROM bookmarks
    WHERE talkie_fk = ${talkie_id} AND user_fk = ${user_id}
  `);
};

const bookmarkTalkie = (talkie_id, user_id) => {
	return talkieDataSource.query(`
    INSERT INTO bookmarks (
      talkie_fk, 
      user_fk
    ) VALUES (
      ${talkie_id},
      ${user_id}
    );
  `);
};

const deleteBookmark = (bookmark_id) => {
	return talkieDataSource.query(`
      DELETE FROM bookmarks
      WHERE bookmark_id = ${bookmark_id}
  `);
};

// 고민이 필 우선 여기까지 SQL 수정
const getTalkieCardByEncounter = (mode, encounter_id, start = 0, user_id) => {
	const QueryByMode = {
		GUEST: `
      SELECT
        encounter_id,
        encounter,
        encounter_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", talkie_id,
            "talkie", talkie
          )
        ) AS talkies
      FROM encounter_category
      LEFT JOIN encounter_talkie ON encounter_id = encounter_talkie.encounter_fk
      LEFT JOIN small_talkies ON encounter_talkie.talkie_fk = talkie_id
      WHERE encounter_id = ${encounter_id}
      GROUP BY encounter_id
      LIMIT 7 OFFSET ${start};
  `,
		USER: `
      SELECT
        encounter_id,
        encounter,
        encounter_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", talkie_id,
            "talkie", talkie,
            "talkie_emoji", talkie_emoji,
            "isSaved", IFNULL(0, 1)
          )
        ) AS talkies
      FROM encounter_category
      LEFT JOIN encounter_talkie ON encounter_id = encounter_talkie.encounter_fk
      LEFT JOIN small_talkies ON talkie_id = encounter_talkie.talk_fk
      LEFT JOIN bookmarks ON bookmarks.talkie_id = talkie_id AND user_fd = ${user_id}
      WHERE encounter_id = ${encounter_id}
      GROUP BY encounter_id
      LIMIT 7 OFFSET ${start};
    `,
	};

	return talkieDataSource.query(QueryByMode[mode]);
};

const getTalkieCardByTopic = (mode, topic_id, start, user_id) => {
	const QueryByMode = {
		GUEST: `
      SELECT
        topic_id,
        topic,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", talkie_id,
            "talkie", talkie
          )
        ) AS talkies
      FROM topic_category
      LEFT JOIN topic_talk ON topic_id = topic_talk.topic_fk
      LEFT JOIN small_talkies ON talkie_id = topic_talk.talkie_fk
      WHERE topic_id = ${topic_id}
      GROUP BY topic_id
      LIMIT 7 OFFSET ${start}
    `,
		USER: `
      SELECT 
        topic_id,
        topic,
        topic_emoji,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "talkie_id", talkie_id,
            "talkie", talkie,
            "isSaved", IFNULL(0, 1)
          )
        ) AS talkies
      FROM topic_category
      LEFT JOIN topic_talk ON topic_id = topic_talk.topic_fk
      LEFT JOIN small_talkies ON talkie_id = topic_talk.talkie_fk
      LEFT JOIN bookmarks ON talkie_id = bookmarks.talk_fk AND user_fk = ${user_id}
      WHERE topic_id = ${topic_id}
      GROUP BY topic_id
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
