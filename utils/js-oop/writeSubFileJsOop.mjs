import { writeFileSync } from "fs";

const routeIndex =
  "const { Router } = require('@dolphjs/core');\n\
const DemoController = require('@/controllers/demo.controller');\n\
\n\
class DemoRouter {\n\
\tpath = '/v1/api';\n\
\tcontroller = new DemoController();\n\
\trouter = Router();\
\n\
\n\
\tconstructor() {\n\
\t	this.Routes();\n\
    }\n\
\n\
\tRoutes() {\n\
\t\tthis.router.get(`${this.path}`, this.controller.sendMessage);\n\
\t}\n\
}\n\
\n\
module.exports = DemoRouter;\
";

const indexData = `const Dolph = require('@dolphjs/core');
const { env, port } = require('./config');
const DemoRouter = require('./routes/demo.route');
const cors = require('cors');
const helmet = require('helmet');

const dolph = new Dolph([new DemoRouter()], port, env, null, [
	helmet(),
	cors({origin: '*'})
]);
dolph.listen();
`;

const controllerDemo = `const { httpStatus, catchAsync } = require('@dolphjs/core');

class DemoController {
	sendMessage = catchAsync(async (req, res) => {
		const message =
		'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/core#README.MD';
		res.status(httpStatus.OK).json({ message });
	});
}

module.exports = DemoController;
`;

const configIndex =
  "const dotenv = require('dotenv');\n\
const Joi = require('joi');\n\
\n\
dotenv.config({});\n\
\n\
const envVarsSchema = Joi.object()\n\
\t.keys({\n\
\t\tNODE_ENV: Joi.string()\n\
\t\t\t.valid('production', 'development', 'test'),\n\
\t\tPORT: Joi.number().default(1919),\
\t})\n\
\t.unknown();\n\
\n\
const { value: envVars, error } = envVarsSchema\n\
\t.prefs({ errors: { label: 'key' } })\n\
\t.validate(process.env);\n\
\n\
if (error) {\n\
\tthrow new Error(`Config validation error: ${error.message}`);\n\
}\n\
\n\
module.exports = {\n\
\t\tenv: envVars.NODE_ENV,\
\t\tport: envVars.PORT,\n\
};\
";

const jsConfigFile = `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`;

export default function writeSubFileJsOop() {
  writeFileSync("src/index.js", indexData);
  writeFileSync("src/config/index.js", configIndex);
  writeFileSync("src/routes/demo.route.js", routeIndex);
  writeFileSync("src/controllers/demo.controller.js", controllerDemo);
  writeFileSync("jsConfig.json", jsConfigFile);
}
