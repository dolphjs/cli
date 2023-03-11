const { httpStatus, catchAsync } = require('@dolphjs/core');

class DemoController {
	sendMessage = catchAsync(async (req, res) => {
		const message =
			'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/dolph-examples#README.MD';
		res.status(httpStatus.OK).json({ message });
	});
}

module.exports = DemoController;
