const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.get("/signup", categoryController.getTopicsForCategory);

module.exports = router;
