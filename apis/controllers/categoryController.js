const categoryService = require("../services/categoryService");

const getTopicsForCategory = (start) => {
	const topics = categoryService.getTopicsForCategory(start);

	res.status(200).json({ topics });
};

module.exports = { getTopicsForCategory };
