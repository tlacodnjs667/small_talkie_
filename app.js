const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./apis/routes/index");

require("dotenv").config();
const { talkieDataSource } = require("./apis/models/talkieDataSource");

app.use(morgan("combined"));
app.use(cors());

app.use(router);

app.listen(process.env.BE_SERVER_PORT, () => {
	console.log(`SERVER IS LISTENING ON PORT ${process.env.BE_SERVER_PORT}`);
});
