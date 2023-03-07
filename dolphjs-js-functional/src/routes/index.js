const { Router } = '@dolphjs/core';
const demoRoute = require('./demo.route');

const router = Router();

const defaultRoutes = [
	{
		path: '/',
		route: demoRoute,
	},
];

module.exports = defaultRoutes;
