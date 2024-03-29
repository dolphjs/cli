import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const readme = `
# DolphJs

DolphJs is an express.js library for making software development easier. It takes care of setup tasks developers need to go about for every project.

DolphJs makes it possible for junior developers to write code in an environment set-up as if they are seniors. It supports robust codebase system and the best error handling middlewares.

With dolphJs, code is minimized as many repetitive features are taken account of and put into the engine which is then exposed to the developer.

## Installation

To install the package, run:

\`npm install @dolphjs/core\`

or \`npm install dolph-cli -g\` to make use of the CLI tool (recommended). [https://github.com/dolphjs/cli]

## Usage

To use the package, you'll need to require it in your project and then set up your routes.

Here's an example of how you can use it:

\`\`\`javascript
    const Dolph, { catchAsync, AppRes httpStatus, Router } = require('@dolphjs/core');

    class TestController {
     constructor() {}

     getMsg = catchAsync(async (req, res, next) => {
      res.send('welcome to this endpoint');
     });
     sendMsg = catchAsync(async (req, res, next) => {
      const { body } = req;
      if (!body.name)
       return next(
        new AppRes(
         httpStatus.BAD_REQUEST,
         'error, provide name in json'
        )
       );

      res.status(httpStatus.OK).json(body);
     });
    }

    class TestRoute {
     path = '/test';
     router = Router();
     controller = new TestController();
     constructor() {
      this.initializeRoutes();
     }
     initializeRoutes() {
      this.router.get(\`\${this.path}\`, this.controller.getMsg);
      this.router.post(\`\${this.path}\`, this.controller.sendMsg);
     }
    }

    const dolph = new Dolph([new TestRoute()], '1919', "development", { url: null }, []);

    dolph.listen();
\`\`\`

or

\`\`\`javascript
const { Router } = require('@dolphjs/core');
const router = Router();

router.get('/', (req, res) => {
  res.send('Heyoooo!!');
});

const routes = [{ path: '/api/v1', router }];

const dolph = new Dolph(routes, '1919', 'development', null, []);
dolph.listen();
\`\`\`

The \`Dolph\` class takes 5 arguments when instantiated: \`\routes\`,\`port\` ,\`node_env\`, \`mongodb connection params\` and \`middleware\`

- \`routes\` is an array of the applications routes
- \`port\` is the port you want your server to run on
- \`node_env\` is your node environment which is set to "development" by default when you run \`node run dev\` . This env can be imported thus:

\`\`\`javascript
require('dotenv').config({});
const nodeEnv = process.env.NODE_ENV;
\`\`\`

- \`mongodb connection params\` is only used if your making use of a mongodb database. It is an object with two fields: \`url\` and \`options\` which are the mongodb url and mongodb options respectively. If your making use of another databse or don't want to connect it through mongodb, you can connect it outside the function and also set the \`url\` param to \`false\`.

\`\`\`javascript
const mongoConfig = {
  url: 'mongodb://127.0.0.1:27017/dolphjs',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: 'dolphjs',
  },
};
new Dolph(routes, '1313', 'development', { url: mongoConfig.url, options: mongoConfig.options }, []);
\`\`\`

or

\`\`\`javascript
const mongoConfig = {
  url: 'mongodb://127.0.0.1:27017/dolphjs',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: 'dolphjs',
  },
};
new Dolph(routes, '1313', 'development', { url: null }, []);
mongoose.connect(mongoConfig.url, mongoConfig.options).then().catch();
\`\`\`

- \`middlewares\` is an array of middlewares you want to pass to the \`express.app\` function embedded inside of dolphjs' engine.

Here's an example:

\`\`\`javascript
const cors = require('cors');
new Dolph(routes, '1313', 'development', { url: null }, [cors({ origin: '*' })]);
\`\`\`

## CatchAsync

The \`catchAsync\` function is a utility function that wraps your route handler functions and catches any errors that may occur inside them. This is useful for handling errors in an async route handler without having to use try-catch blocks.

Here's an example of how you can use it:

\`\`\`javascript
const { catchAsync } = require('@dolphjs/core');
const routeHandler = catchAsync(async (req, res, next) => {
  // your route code here
});
module.exports = routerHandler;
\`\`\`

## AppRes

The \`AppRes\` class is a custom error class that you can use to return custom error responses to the client. It takes two arguments: an HTTP status code and a message.

Here's an example of how you can use it:

\`\`\`javascript
if (!body.name) return next(new Dolph.AppRes(httpStatus.BAD_REQUEST, 'error, provide name in json'));
\`\`\`

## HttpStatus

The \`httpStatus\` object is an object containing commonly used HTTP status codes as properties. You can use this to set the status code of your custom error responses.
It is just an export of the original http-status package, here [https://github.com/adaltas/node-http-status]

Here's an example of how you can use it:

\`\`\`javascript
const { AppRes } = require('@dolphjs/core');
new AppRes(Dolph.httpStatus.BAD_REQUEST, 'error message');
\`\`\`

## MediaParser

The \`mediaParser\` function uses the \`multer\` package under the hood to parse media files. Thus freeing you from the stress of setting up the package.

Here's an example of how you can use it:

\`\`\`javascript
const { Router, mediaParser } = require('@dolphjs/core');
const TestController = require('@/controllers/test.controller');

class TestRoute {
  path = '/test';
  router = Router();
  controller = new TestController();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(\`\${this.path}\`, this.controller.getMsg);
    this.router.post(
     \`\${this.path}\`,
      mediaParser({ type: 'single', storage: {}, fieldname: 'upload' }),
      this.controller.sendMsg
    );
  }
}
\`\`\`

alternatively,

\`\`\`javascript
const { Router, mediaParser } = require('@dolphjs/core');
const TestController = require('@/controllers/test.controller');

const router = Router();

router.get(\`\${this.path}\`, new TestController().getMsg);
router.post(\`\${this.path}\`, mediaParser({ type: 'single', storage: {}, fieldname: 'upload' }), new TestController().sendMsg);

const routes = [{ path: '/', router }];
\`\`\`

It accepts five arguments: \`type\`, \`storage\`, \`fieldname\`, \`limit\`

- the current version of dolphjs supports two types => \`single\` && \`array\`

- the \`single\` type is used for uploading a single media file
- the \`array\` type is used to upload an array of files with a common fieldname

- the storage parameter defaults to an empty object but takes the same fields you would pass to the \`diskStorage\` function in multer [https://github.com/expressjs/multer] which means files wouldn't be stored in the filesystem.
  Leaving it empty is ideal when you want to get the file path and store in a cloud service like \`AWS\` or \`Cloudinary\`.

- the fieldname parameter specifies the name that would be used to identify the file(s) from the frontend or API tetsing tool.

- the limit parameter is only used when the \`type\` paramter is set to \`array\`. This tells the function the max amount of files it's allowed to parse.

## Usage With Websockets

Incase you wonder how you'll attach a websocket server to the dolph engine then this would be of help:
using socket.io -

\`\`\`javascript
const io = require('socket.io');

const dolph = new Dolph(routes, '1313', 'development', { url: mongoConfig.url, options: mongoConfig.options }, middlewares);
const server = dolph.listen();

const socket = io(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

global.onlineUsers = new Map();

socket.on('connection', (socket) => {
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);

    if (onlineUsers.get(userId)) {
      socket.emit('active', userId);
    }
  });
});
\`\`\`

## Note

Dolphjs makes use of the following middleware packages so you don't need to install them again:

- helmet
- httpStatus
- express

If you need a better guide on how to setup a dolphjs application is best you view an example application built with dolphjs [https://github.com/dolphjs/example]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Please note that this package is still in it's beta stage and a lot of features would be added in later versions will be released in the future. Stay tuned for updates and new features

### BENCHMARK

DolphJS is very performant, to run benchmarks is very simple:

\`\`\`bash
  yarn benchmark
\`\`\`

or

\`\`\`bash
  npm run benchmark
\`\`\`

`;

export default function writeReadmeFile() {
  writeFileSync("readme.md", readme);
}
