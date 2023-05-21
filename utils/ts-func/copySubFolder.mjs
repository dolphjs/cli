import { writeFileSync } from "fs";

const indexData = `import Dolph from '@dolphjs/core';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import demoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph(demoAppRouter, PORT, ENV,  null , [
\t	helmet(),
\t cors({'origin': '*'})
]);

dolph.listen();
`;

const configIndex = `import { config } from 'dotenv';
config({});
export const { PORT, ENV } = process.env;
`;

const demoController = `import { Request, Response } from 'express'; \n
import { AppRes, catchAsync, httpStatus } from '@dolphjs/core';\n

const sendGreeting = catchAsync(async (req: Request, res: Response) => {
\tconst message = 
\t'Welcome to the API end-point for the Dolph app. If you have problems getting \tstarted, visit https://github.com/dolphjs/dolph-examples#README.MD';
\tres.status(httpStatus.OK).send({ message });
});

export default { sendGreeting };\
`;

const demoRoute = `import { Router } from '@dolphjs/core'
import { sendGreeting } from '@/controllers/demo.controller'

const router = Router();
const path = '/api/v1';
router.get(\`\${path}\`, sendGreeting)

const routes = [
  {
    path: '/',
    router,
  }
]

export default routes;
`;
export default function writeSubFile() {
  writeFileSync("src/index.ts", indexData);
  writeFileSync("src/config/index.ts", configIndex);
  writeFileSync("src/controllers/demo.controller.ts", demoController);
  writeFileSync("src/routes/demo.route.ts", demoRoute);
}
