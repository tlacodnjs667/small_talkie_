const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./apis/routes/index");
const { globalErrorHandler } = require("./apis/utils/globalErrorHandler");

require("dotenv").config();
const { talkieDataSource } = require("./apis/models/talkieDataSource");

app.use(cors());
app.use(express.json());

app.use(router);
app.use(morgan("combined"));

app.get("/ping", (req, res) => {
	const status = 200;
	const message = "PONG";
	res.status(status).json({ message: message });
});

app.use(globalErrorHandler);

app.listen(process.env.BE_SERVER_PORT, () => {
	console.log(`SERVER IS LISTENING ON PORT ${process.env.BE_SERVER_PORT}`);
});
