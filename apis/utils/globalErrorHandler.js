const catchAsync = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch((err) => next(err));
	};
};

const globalErrorHandler = (err, req, res, next) => {
	console.dir(err.message);
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({ message: err.message });
};

module.exports = { catchAsync, globalErrorHandler };
