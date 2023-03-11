const Dolph = require('@dolphjs/core');
const { env, port } = require('./config');
const DemoRouter = require('./routes/demo.route');
const helmet = require('helmet');

const dolph = new Dolph([new DemoRouter()], port, env, { url: null }, [
	helmet(),
]);
dolph.listen();
