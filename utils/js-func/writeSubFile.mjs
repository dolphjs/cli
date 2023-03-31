import { writeFileSync } from "fs";

const indexRoute = `const { Router } = '@dolphjs/core';
const demoRoute = require('./demo.route');

const router = Router();

const defaultRoutes = [
\t	{
\t\t		path: '/',
\t\t		route: demoRoute,
\t	},
];

module.exports = defaultRoutes;
`;

const demoRoutes =
  "const { Router } = require('@dolphjs/core');\n\
const { sendMsg } = require('../controllers/demo.controller');\n\
\
const router = Router();\n\
\
const path = '/api/v1';\n\
\
router.get(`${path}`, sendMsg);\n\
\
module.exports = router;\n\
";

const indexData = `const Dolph = require('@dolphjs/core');
const defaultRouter = require('./routes');
const { env, port } = require('./config');
const helmet = require('helmet');
const cors = require('cors');

const dolph = new Dolph([defaultRouter], port, env, { url: null }, [helmet(), cors()]);
dolph.listen();
`;

const controllerDemo = `const { httpStatus, catchAsync } = require('@dolphjs/core');

const sendMsg = catchAsync(async (req, res) => {
\t	const message =
\t\t		'Welcome to the API end-point for the Dolph app. If you have problems getting started, visit https://github.com/dolphjs/dolph-examples#README.MD';
\t	res.status(httpStatus.OK).json({ message });
});

module.exports = { sendMsg };
`;

const configIndex =
  "const dotenv = require('dotenv');\n\
const path = require('path');\n\
const Joi = require('joi');\n\
\n\
dotenv.config({});\n\
\n\
const envVarsSchema = Joi.object()\n\
\t	.keys({\n\
\t\t		NODE_ENV: Joi.string()\n\
\t\t\t			.valid('production', 'development', 'test')\n\
\t\t\t			.required(),\n\
\t\t		PORT: Joi.number().default(1919),\n\
\t	})\
	.unknown();\n\
\
const { value: envVars, error } = envVarsSchema\n\
\t	.prefs({ errors: { label: 'key' } })\n\
\t	.validate(process.env);\n\
\n\
if (error) {\n\
\t	throw new Error(`Config validation error: ${error.message}`);\n\
}\n\
\n\
module.exports = {\n\
\t	env: envVars.NODE_ENV,\n\
\t	port: envVars.PORT,\n\
};\
";

export default function writeSubFileJsFunc() {
  writeFileSync("src/index.js", indexData);
  writeFileSync("src/config/index.js", configIndex);
  writeFileSync("src/routes/demo.route.js", demoRoutes);
  writeFileSync("src/routes/index.js", indexRoute);
  writeFileSync("src/controllers/demo.controller.js", controllerDemo);
}
