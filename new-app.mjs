#!/usr/bin/env node
import { Command } from "commander";
import { execSync, exec } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import writeFilePackage from "./utils/ts-oop/packageData.mjs";
import writeFileSwcrc from "./utils/ts-oop/swcrcData.mjs";
import writeGitignoreFile from "./utils/ts-oop/gitignoreData.mjs";
import writeNodemonFile from "./utils/ts-oop/nodemonData.mjs";
import writeReadmeFile from "./utils/ts-oop/readmeData.mjs";
import writeSubFile from "./utils/ts-oop/copySubFolder.mjs";
import writeSubFileJsFunc from "./utils/js-func/writeSubFile.mjs";
import writeTsconfigFile from "./utils/ts-oop/tsconfigFile.mjs";
import writeSubFileJsOop from "./utils/js-oop/writeSubFileJsOop.mjs";
import writeFilePackageJs from "./utils/js-oop/packageData.mjs";

const dependencies = [
  "@dolphjs/core",
  "nodemon",
  "class-transformer",
  "handlebars",
  "cross-env",
  "dotenv",
  "joi",
  "helmet",
  "@swc/cli",
  "@swc/core",
  "@types/cors",
  "@types/express",
  "@types/mjml",
  "@types/node",
  "@types/nodemailer",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-config-airbnb-base",
  "eslint-config-prettier",
  "eslint-plugin-import",
  "eslint-plugin-prettier",
  "eslint-plugin-security",
  "husky",
  "lint-staged",
  "node-config",
  "node-gyp",
  "nodemon",
  "prettier",
  "ts-node",
  "tsc-alias",
  "tsconfig-paths",
  "typescript",
];

const dependenciesJs = [
  "@dolphjs/core",
  "nodemon",
  "class-transformer",
  "handlebars",
  "cross-env",
  "dotenv",
  "joi",
  "helmet",
  "@swc/cli",
  "@swc/core",
  "eslint",
  "eslint-config-airbnb-base",
  "eslint-config-prettier",
  "eslint-plugin-import",
  "eslint-plugin-prettier",
  "eslint-plugin-security",
  "husky",
  "lint-staged",
  "node-config",
  "node-gyp",
  "nodemon",
  "prettier",
];
const program = new Command();

program
  .version("1.0.0")
  .command("create-app <app-name>")
  .description("Create a new DolphJS app")
  .action(async (appName) => {
    try {
      console.log(chalk.blueBright("Creating your DolphJS app...") + "🐬");

      const options = [
        //'TypeScript - OOP',
        //'TypeScript - Functional Programming',
        "Javascript - OOP",
        "Javascript - Functional Programming",
      ];
      const { selectedOption } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedOption",
          message: "Choose your desired template you want to build with!😀:",
          choices: options,
        },
      ]);
      console.log(
        chalk.green(`Getting your template ready for ${selectedOption}!`)
      );
      mkdirSync(appName);
      process.chdir(appName);
      //    const destDirname =
      //const packageJsonPath = `./${appName}/package.json`;
      // install dependencies using child process execSync
      try {
        if (selectedOption === "TypeScript - OOP") {
          writeFilePackage(appName);
          writeFileSwcrc();
          writeGitignoreFile();
          writeNodemonFile();
          writeReadmeFile();
          writeTsconfigFile();
          mkdirSync("src");
          mkdirSync("src/config");
          mkdirSync("src/controllers");
          mkdirSync("src/interfaces");
          mkdirSync("src/routes");
          writeSubFile();

          const spinner = ora("Installing dependencies...").start();
          execSync(`npm install ${dependencies.join(" ")}`);
          spinner.succeed("Dependencies installed!");
        }
        if (selectedOption === "TypeScript - Functional Programming") {
          writeFilePackage(appName);
          writeFileSwcrc();
          writeGitignoreFile();
          writeNodemonFile();
          writeTsconfigFile();
          writeReadmeFile();
          mkdirSync("src");
          mkdirSync("src/config");
          mkdirSync("src/controllers");
          mkdirSync("src/interfaces");
          mkdirSync("src/routes");
          writeSubFile();

          const spinner = ora("Installing dependencies...").start();
          execSync(`npm install ${dependencies.join(" ")}`);
          spinner.succeed("Dependencies installed!");
        }

        if (selectedOption === "Javascript - Functional Programming") {
          writeFilePackageJs(appName);
          writeReadmeFile();
          writeGitignoreFile();
          writeNodemonFile();
          mkdirSync("src");
          mkdirSync("src/config");
          mkdirSync("src/controllers");
          mkdirSync("src/routes");
          writeSubFileJsFunc();

          const spinner = ora("Installing dependencies...").start();
          execSync(`npm install ${dependencies.join(" ")}`);
          spinner.succeed("Dependencies installed!");
        }

        if (selectedOption === "Javascript - OOP") {
          writeFilePackageJs(appName);
          writeReadmeFile();
          writeGitignoreFile();
          writeNodemonFile();
          mkdirSync("src");
          mkdirSync("src/config");
          mkdirSync("src/controllers");
          mkdirSync("src/routes");
          writeSubFileJsOop();
          const spinner = ora("Installing dependencies...").start();
          execSync(`npm install ${dependenciesJs.join(" ")}`);
          spinner.succeed("Dependencies installed!");
        }

        // update package.json file
        console.log(chalk.yellow("Updating package.json..."));
        // install dev dependencies
        const spinner2 = ora("Installing dev dependencies...").start();
        exec("npm install --save-dev @swc/core nodemon husky lint-staged");
        spinner2.succeed("Dev dependencies installed!");

        // show completion message
        console.log(
          chalk.green(
            `Done! Your app has been created. Navigate to your app by running "cd ${appName}" and then run "npm start"`
          )
        );
      } catch (error) {
        console.log(chalk.redBright("\nError creating your dolph app", error));
      }
    } catch (error) {
      console.log(chalk.redBright("Error creating your dolph app", error));
    }
  })

  program.command('*', { hidden: true })
  .action(() => {
    console.log(chalk.redBright(`Unknown command. See the list of available commands:`));
    program.help()
  });

program.parse(process.argv);
