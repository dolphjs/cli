const { Router } = require('@dolphjs/core');
const DemoController = require('../controllers/demo.controller');

class DemoRouter {
	path = '/v1/demo';
	controller = new DemoController();
	router = Router();

	constructor() {
		this.Routes();
	}

	Routes() {
		this.router.get(`${this.path}`, this.controller.sendMessage);
	}
}

module.exports = DemoRouter;
