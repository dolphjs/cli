import { writeFileSync } from "fs";

const indexData = `import Dolph from '@dolphjs/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import DemoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph([new DemoAppRouter()], PORT, ENV, { url: null }, [
\t	helmet(),
]);
dolph.listen();
`

const configIndex = `import { config } from 'dotenv';
config({});
export const { PORT, ENV } = process.env;
`

const demoController =  `import { Request, Response } from 'express';
import { AppRes, catchAsync, httpStatus } from '@dolphjs/core';

class DemoAppController {
\t	public sendGreeting = catchAsync(async (req: Request, res: Response) => {
\t\t		const message =
\t\t			'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/dolph-examples#README.MD';
	\t\t	res.status(httpStatus.OK).send({ message });
	\t});
}
\n
export default DemoAppController;\
`;

const demoInterface = `import { Router } from '@dolphjs/core';\n
export interface Routes {
\t	path?: string;
\t	router: typeof Router;
}
`

const demoRoute = "import { Router } from '@dolphjs/core'\;\n\
import DemoAppController from '@/controllers/demo.controller'\;\n\
class DemoAppRouter \{\n\
\t	public path?: string = '/api/v1'\;\n\
\t	public router = Router()\;\n\
\t	protected controller: DemoAppController = new DemoAppController()\;\n\
\t	constructor() \{\n\
\t\t		this.Routes()\;\n\
\t	\}\n\
      \
private Routes() \{\n\
\t\tthis.router.get(\`${this.path}\`, this.controller.sendGreeting)\;\n\
\t	\}\n\
\}\n\
export default DemoAppRouter\;\
"

export default function writeSubFile(){
   writeFileSync('src/index.ts', indexData)
   writeFileSync('src/config/index.ts', configIndex)
   writeFileSync('src/controllers/demo.controller.ts', demoController)
   writeFileSync('src/interfaces/routes.interface.ts', demoInterface)
   writeFileSync('src/routes/demo.route.ts', demoRoute)
}