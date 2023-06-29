const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const talkieRouter = require("./talkieRouter");

router.use("/user", userRouter);
router.use("/topic", categoryRouter);
router.use("/talkie", talkieRouter);

module.exports = router;
