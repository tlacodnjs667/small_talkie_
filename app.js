const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

require('dotenv').config();
app.use(morgan('combined'));
app.use(cors());

app.listen(process.env.BE_SERVER_PORT, ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${process.env.BE_SERVER_PORT}`);
})