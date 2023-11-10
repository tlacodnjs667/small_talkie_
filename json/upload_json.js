module.exports = {checkDefaultDataInDB};

function insertValuesDataBase(talkieDataSource) {

    const insertData = [];

  const situationJson = require('./situation.json');
  const inserSituationValue = situationJson
    .map((el) => `( '${el.situation}' )`)
    .join(',');
  insertData.push(`INSERT INTO SITUATION_CATEGORY ( SITUATION ) VALUES ${inserSituationValue}`);

  const encounterJson = require('./encounter.json');
  const insertEncounterValue = encounterJson
    .map((el) => `('${el.encounter}', ${el.situation_fk})`)
    .join(', ');
    insertData.push(`INSERT INTO ENCOUNTER_CATEGORY ( encounter, situation_fk ) VALUES ${insertEncounterValue}`);

  const smallTalkieJson = require('./small_talki.json');
  const insertTalkieValue = smallTalkieJson
    .map((el) => `( '${el.talkie}' )`)
    .join(', ');
    insertData.push(`INSERT INTO SMALL_TALKIES (talkie) VALUES ${insertTalkieValue}`);

  const talkieEncounterJson = require('./encounter_talkie.json');
  const insertTalkieEncounterV = talkieEncounterJson
    .map((el) => `(${el.encounter_fk} , ${el.talkie_fk})`)
    .join(', ');
    insertData.push(`INSERT INTO ENCOUNTER_TALKIE (ENCOUNTER_FK, TALKIE_FK) VALUES ${insertTalkieEncounterV}`);

  const topicJson = require('./topic.json');
  const insertTopicValue = topicJson.map((el) => `( '${el.topic}' )`).join(', ');
  insertData.push(`INSERT INTO TOPIC_CATEGORY (topic) VALUES ${insertTopicValue}`);

  const topicTalkieJson = require('./topic_talkie.json');
  const insertTopicTalkieValue = topicTalkieJson.map(el => `( ${el.talkie_fk}, ${el.topic_fk} )`).join(', ');
  insertData.push(`INSERT INTO TOPIC_TALK (talkie_fk, topic_fk) VALUES ${insertTopicTalkieValue}`);

  insertData.forEach(el => {
    talkieDataSource.query(el);
  })
}

async function checkDefaultDataInDB (talkieDataSource) {

    const [data] = await talkieDataSource.query (`SELECT COUNT(*) AS cnt FROM SMALL_TALKIES`);

    
    if (!data.cnt) {
        console.log("db에 데이터가 없습니다.");
        insertValuesDataBase(talkieDataSource);
    } else {
        console.log(data.cnt);
        console.log("디비에 이미 데이터가 있습니다.");
    }
}
