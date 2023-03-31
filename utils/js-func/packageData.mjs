import { writeFileSync } from "fs";

export default function writeFilePackage(appName) {
  const packageJsonData = {
    name: appName,
    version: "1.0.0",
    description: "",
    main: "src/index.js",
    scripts: {
      dev: "cross-env NODE_ENV=development nodemon src/index.js",
      start: "cross-env NODE_ENV=production node src/index.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
    dependencies: {},
    devDependencies: {},
  };
  writeFileSync(`./package.json`, JSON.stringify(packageJsonData, null, 2));
}
