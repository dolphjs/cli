import path from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const indexData = `import Dolph from '@dolph/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import DemoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph([new DemoAppRouter()], PORT, ENV, { url: null }, [
	helmet(),
]);
dolph.listen();
`

const configIndex = `import { config } from 'dotenv';
config({});

export const { PORT, ENV } = process.env;
`

const demoController =  `import { Request, Response } from 'express';
import { AppRes, catchAsync, httpStatus } from '@dolph/core';

class DemoAppController {
	public sendGreeting = catchAsync(async (req: Request, res: Response) => {
		const message =
			'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/dolph-examples#README.MD';
		res.status(httpStatus.OK).send({ message });
	});
}

export default DemoAppController;
`;

const demoInterface = `import { Router } from '@dolph/core';

export interface Routes {
	path?: string;
	router: typeof Router;
}
`

const demoRoute = "import { Router } from '@dolph/core'\;\
import DemoAppController from '@/controllers/demo.controller'\;\
class DemoAppRouter \{\
	public path?: string = '/api/v1'\;\
	public router = Router()\;\
	protected controller: DemoAppController = new DemoAppController()\;\
	constructor() \{\
		this.Routes()\;\
	\}\
      \n\
	private Routes() \{\
		this.router.get(\`${this.path}\`, this.controller.sendGreeting)\;\
	\}\
\}\
\n\
export default DemoAppRouter\;\
"

export default function writeSubFile(){
   writeFileSync('src/index.ts', indexData)
   writeFileSync('src/config/index.ts', configIndex)
   writeFileSync('src/controllers/demo.controller.ts', demoController)
   writeFileSync('src/interfaces/routes.interface.ts', demoInterface)
   writeFileSync('src/routes/demo.route.ts', demoRoute)
}