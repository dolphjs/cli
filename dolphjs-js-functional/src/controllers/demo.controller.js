const { httpStatus, catchAsync } = require('@dolph/core');

const sendMsg = catchAsync(async (req, res) => {
	const message =
		'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/dolph-examples#README.MD';
	res.status(httpStatus.OK).json({ message });
});

module.exports = { sendMsg };
