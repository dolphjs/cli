const { Router } = "@dolphjs/core";
const demoRoute = require("./demo.route");

const defaultRoutes = [
  {
    path: "/",
    router: demoRoute,
  },
];

module.exports = defaultRoutes;
