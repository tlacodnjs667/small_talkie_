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

app.use(morgan("combined"));
app.use(router);

app.post("/ping", (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: "pong" });
});

app.use(globalErrorHandler);

app.listen(process.env.BE_SERVER_PORT, () => {
	console.log(`SERVER IS LISTENING ON PORT ${process.env.BE_SERVER_PORT}`);
});
