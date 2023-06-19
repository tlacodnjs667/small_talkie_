const categoryDao = require("../models/categoryDao");

const getTopicsForCategory = (start) => {
	return categoryDao.getTopicsForCategory(start);
};

module.exports = { getTopicsForCategory };
