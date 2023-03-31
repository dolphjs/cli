export const dependencies = [
  "@dolphjs/core",
  "cors",
  "cross-env",
  "dotenv",
  "joi",
];

export const devDependencies = ["@types/express", "node-config"];

export const tsDependencies = [...dependencies, "class-transformer"];
export const tsDevDependencies = [
  ...devDependencies,
  "@swc/cli",
  "@swc/core",
  "@types/cors",
  "@types/joi",
  "@types/node",
  "ts-node",
  "tsc-alias",
  "tsconfig-paths",
  "typescript",
];
