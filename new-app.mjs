#!/usr/bin/env node
import { Command } from "commander";
import { exec, execSync } from "child_process";
import { mkdirSync } from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import writeTsFilePackage from "./utils/ts-oop/packageData.mjs";
import writeTsFuncFilePackage from "./utils/ts-func/packageData.mjs";
import writeJsFIlePackage from "./utils/js-func/packageData.mjs";
import writeTsFileSwcrc from "./utils/ts-oop/swcrcData.mjs";
import writeGitignoreFile from "./utils/ts-oop/gitignoreData.mjs";
import writeTsNodemonFile from "./utils/ts-oop/nodemonData.mjs";
import writeReadmeFile from "./utils/ts-oop/readmeData.mjs";
import writeTsOopSubFile from "./utils/ts-oop/copySubFolder.mjs";
import writeTsFuncSubFile from "./utils/ts-func/copySubFolder.mjs";
import writeSubFileJsFunc from "./utils/js-func/writeSubFile.mjs";
import writeSubFileJsOop from "./utils/js-oop/writeSubFileJsOop.mjs";
import writeTsconfigFile from "./utils/ts-oop/tsconfigFile.mjs";
import { jsFunc, jsOop, tsFunc, tsOop } from "./utils/constants/types.mjs";
import { npm, pnpm, yarn } from "./utils/constants/packageManagers.mjs";
import {
  dependencies,
  devDependencies,
  tsDependencies,
  tsDevDependencies,
} from "./utils/dependencies.mjs";

const program = new Command();

program
  .version("0.1.0")
  .command("create-app <app-name>")
  .description("Create a new dolphJs application")
  .action(async (appName) => {
    try {
      console.log(
        chalk.blueBright("Initializing your dolphJs application...") + "🐬"
      );
      const options = [tsOop, tsFunc, jsOop, jsFunc];
      const { selectedOption } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedOption",
          message: "How do you want to write your application ? 🤔:",
          choices: options,
        },
      ]);

      const packageManagerOptions = [npm, yarn, pnpm];
      const { selectedPackageManagerOption } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedPackageManagerOption",
          message: "Which is your preffered package manager ? :",
          choices: packageManagerOptions,
        },
      ]);
      console.info(chalk.green(`Using ${selectedPackageManagerOption}!`));
      console.log(
        chalk.green(`Getting your application ready for ${selectedOption}!`)
      );
      mkdirSync(appName);
      process.chdir(appName);
      if (selectedOption === tsOop) {
        writeTsFilePackage(appName);
        writeTsFileSwcrc();
        writeGitignoreFile();
        writeTsNodemonFile();
        writeReadmeFile();
        writeTsconfigFile();
        mkdirSync("src");
        mkdirSync("src/config");
        mkdirSync("src/controllers");
        mkdirSync("src/interfaces");
        mkdirSync("src/routes");
        writeTsOopSubFile();
      }
      if (selectedOption === tsFunc) {
        writeTsFuncFilePackage(appName);
        writeTsFileSwcrc();
        writeGitignoreFile();
        writeTsNodemonFile();
        writeTsconfigFile();
        writeReadmeFile();
        mkdirSync("src");
        mkdirSync("src/config");
        mkdirSync("src/controllers");
        mkdirSync("src/routes");
        writeTsFuncSubFile();
      }

      if (selectedOption === jsFunc) {
        writeJsFIlePackage(appName);
        writeReadmeFile();
        writeGitignoreFile();
        mkdirSync("src");
        mkdirSync("src/config");
        mkdirSync("src/controllers");
        mkdirSync("src/routes");
        writeSubFileJsFunc();
      }

      if (selectedOption === jsOop) {
        writeJsFIlePackage(appName);
        writeReadmeFile();
        writeGitignoreFile();
        mkdirSync("src");
        mkdirSync("src/config");
        mkdirSync("src/controllers");
        mkdirSync("src/routes");
        writeSubFileJsOop();
      }

      // install dependencies using child process execSync
      try {
        const spinner = ora("Installing dependencies...").start();
        let installCommand = "yarn add";
        let runMsg = "yarn dev";

        switch (selectedPackageManagerOption) {
          case npm:
            installCommand = "npm install";
            runMsg = "npm run dev";
            break;
          case pnpm:
            installCommand = "pnpm add";
            runMsg = "pnpm dev";
          case yarn:
            installCommand = installCommand;
          default:
            break;
        }

        if (selectedOption === jsFunc || selectedOption === jsOop) {
          execSync(`${installCommand} ${dependencies.join(" ")}`);
        } else if (selectedOption === tsFunc || selectedOption === tsOop) {
          execSync(`${installCommand} ${tsDependencies.join(" ")}`);
        }
        spinner.succeed("Dependencies installed!");

        // prompt user to select an option

        // create app directory and copy files

        // update package.json file
        console.log(chalk.yellow("Updating package.json..."));
        // install dev dependencies
        const spinner2 = ora("Installing dev dependencies...").start();

        if (selectedOption === jsFunc || selectedOption === jsOop) {
          execSync(`${installCommand} ${devDependencies.join(" ")} -D`);
        } else if (selectedOption === tsFunc || selectedOption === tsOop) {
          execSync(`${installCommand} ${tsDevDependencies.join(" ")} -D`);
        }

        spinner2.succeed("Dev dependencies installed!");

        // show completion message
        console.log(
          chalk.green(
            `Done! Your app has been created. Navigate to your app by running "cd ${appName}" and then run ${runMsg}`
          )
        );
        process.exit(1);
      } catch (error) {
        console.log(chalk.redBright("\nError creating your app", error));
      }
    } catch (error) {
      console.log(chalk.redBright("Error creating your app", error));
    }
  });

program.command("help").action(() => {
  console.info(
    chalk.white(
      "The `create-app` command would walk you through a few questions in order to create your app how you desire together with dolphjs' unique and scalable application structure."
    )
  );
  console.info(chalk.blue("Options: "));
  console.info(
    chalk.white(
      "-v, --version                                       output the verson number"
    )
  );
  console.info(
    chalk.white(
      "-h, --version                                       display help for command"
    )
  );

  console.info(chalk.blue("Commands: "));
  console.info(
    chalk.white(
      "create-app, <app-name>                               Create a new dolphjs app"
    )
  );
});

program.command("*", { hidden: true }).action(() => {
  console.log(
    chalk.redBright(`Unknown command. See the list of available commands:`)
  );
  program.help();
});

program.parse(process.argv);
