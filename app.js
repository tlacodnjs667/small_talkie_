const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { globalErrorHandler } = require("./apis/utils/globalErrorHandler");

const app = express();

require("dotenv").config();
app.use(cors());

app.use(morgan("combined"));
app.use(globalErrorHandler);

app.listen(process.env.BE_SERVER_PORT, () => {
	console.log(`SERVER IS LISTENING ON PORT ${process.env.BE_SERVER_PORT}`);
});
