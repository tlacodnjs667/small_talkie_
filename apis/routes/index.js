const router = require("express").Router();

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/topic", categoryRouter);

module.exports = router;
