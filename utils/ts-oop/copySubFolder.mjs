import { writeFileSync } from "fs";

const indexData = `import Dolph from '@dolphjs/core';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import DemoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph([new DemoAppRouter()], PORT, ENV,  null , [
	helmet(),
  cors({'origin': '*'})
]);
dolph.listen();
`;

const configIndex = `import { config } from 'dotenv';
config({});
export const { PORT, ENV } = process.env;
`;

const demoController = `import { Request, Response } from 'express';
import { AppRes, catchAsync, httpStatus } from '@dolphjs/core';

class DemoAppController {
\tpublic sendGreeting = catchAsync(async (req: Request, res: Response) => {
\t  const message =
\t  'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/\t  core#README.MD';
\t  res.status(httpStatus.OK).send({ message });
\t});
}
\n
export default DemoAppController;\
`;

const demoInterface = `import { Router } from '@dolphjs/core';\n
export interface Routes {
\tpath?: string;
\trouter: typeof Router;
}
`;

const demoRoute =
  "import { Router } from '@dolphjs/core';\n\
import DemoAppController from '@/controllers/demo.controller';\n\
\n\
class DemoAppRouter {\n\
\tpublic path?: string = '/api/v1';\n\
\tpublic router = Router();\n\
\n\
\tprotected controller: DemoAppController = new DemoAppController();\n\
\tconstructor() {\n\
\t\tthis.Routes();\n\
\t}\n\
    \
private Routes() {\n\
\t\tthis.router.get(`${this.path}`, this.controller.sendGreeting);\n\
\t}\n\
}\n\
export default DemoAppRouter;\
";

export default function writeSubFile() {
  writeFileSync("src/index.ts", indexData);
  writeFileSync("src/config/index.ts", configIndex);
  writeFileSync("src/controllers/demo.controller.ts", demoController);
  writeFileSync("src/interfaces/routes.interface.ts", demoInterface);
  writeFileSync("src/routes/demo.route.ts", demoRoute);
}
