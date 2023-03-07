import { Router } from '@dolphjs/core';
import controller from '@/controllers/demo.controller';

class DemoAppRouter {
	public path?: string = '/api/v1';
	public router = Router();

	constructor() {
		this.Routes();
	}

	private Routes() {
		this.router.get(`${this.path}`, controller.sendGreeting);
	}
}

export default DemoAppRouter;
