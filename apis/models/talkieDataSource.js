const { DataSource } = require("typeorm");
const { checkDefaultDataInDB } = require('../../json/upload_json');

require("dotenv").config();
const talkieDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
	port: process.env.TYPEORM_PORT,
	host: process.env.TYPEORM_HOST,
	username: process.env.TYPEORM_USERNAME,
	password: process.env.TYPEORM_PASSWORD,
	database: process.env.TYPEORM_DATABASE,
});

talkieDataSource.initialize().then(() => {
	console.log(`BE_DATASOURCE_HAS_BEEN_INITIALIZED!`);
	checkDefaultDataInDB(talkieDataSource);
});

module.exports = { talkieDataSource };
