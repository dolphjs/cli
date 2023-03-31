import { writeFileSync } from "fs";

export default function writeFilePackage(appName) {
  const packageJsonData = {
    name: appName,
    version: "1.0.0",
    description: "",
    main: "src/index.ts",
    scripts: {
      dev: "cross-env NODE_ENV=development nodemon",
      build: "swc src -d dist --source-maps --copy-files",
      "build:tsc": "tsc && tsc-alias",
      start:
        "npm run build && cross-env NODE_ENV=production node/dist/index.js",
    },
    keywords: [],
    author: "",
    license: "ISC",
    dependencies: {},
    devDependencies: {},
  };
  writeFileSync(`./package.json`, JSON.stringify(packageJsonData, null, 2));
}
