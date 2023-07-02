const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const talkieRouter = require("./talkieRouter");

router.use("/user", userRouter);
router.use("/talkie", talkieRouter);
router.use("/topic", categoryRouter);
router.use("/category", categoryRouter);

module.exports = router;
