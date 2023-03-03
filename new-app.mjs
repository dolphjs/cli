#!/usr/bin/env node
import { Command } from 'commander';
import { execSync, exec } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from "url";
import writeFilePackage from './utils/packageData.mjs';
import writeFileSwcrc from './utils/swcrcData.mjs';
import writeGitignoreFile from './utils/gitignoreData.mjs';
import writeNodemonFile from './utils/nodemonData.mjs';
import writeReadmeFile from './utils/readmeDate.mjs';
import writeSubFile from './utils/copySubFolder.mjs';

const dependencies = [
  '@dolphjs/core',
  'class-transformer',
  'handlebars',
  'cross-env',
  'dotenv',
  'helmet',
  '@swc/cli',
  '@swc/core',
  '@types/cors',
  '@types/express',
  '@types/mjml',
  '@types/node',
  '@types/nodemailer',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-config-prettier',
  'eslint-plugin-import',
  'eslint-plugin-prettier',
  'eslint-plugin-security',
  'husky',
  'lint-staged',
  'node-config',
  'node-gyp',
  'nodemon',
  'prettier',
  'ts-node',
  'tsc-alias',
  'tsconfig-paths',
  'typescript',
];
const program = new Command();

program
  .version('0.1.0')
  .command('create-app <app-name>')
  .description('Create a new DolphJS app')
  .action(async (appName) => {
    try {
      console.log(chalk.blue('Creating your DolphJS app...') + '🐬');

    const options = [
      'TypeScript - OOP',
      'TypeScript - Functional Programming',
      'Javascript - OOP',
      'Javascript - Functional Programming',
    ];
    const { selectedOption } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedOption',
        message: 'Choose your desired template you want to build with!😀:',
        choices: options,
      },
    ]);
    console.log(chalk.green(`Getting your template ready for ${selectedOption}!`));
    mkdirSync(appName);
    process.chdir(appName)
//    const destDirname = 
    //const packageJsonPath = `./${appName}/package.json`;
    writeFilePackage(appName)
    writeFileSwcrc()
    writeGitignoreFile()
    writeNodemonFile()
    writeReadmeFile()
    mkdirSync('src')
    mkdirSync('src/config')
    mkdirSync('src/controllers')
    mkdirSync('src/interfaces')
    mkdirSync('src/routes')
    writeSubFile()
    // install dependencies using child process execSync
    try {
      const spinner = ora('Installing dependencies...').start()
       execSync(`npm install ${dependencies.join(' ')}`);
      spinner.succeed('Dependencies installed!');
    
      // prompt user to select an option
  
      // create app directory and copy files
  
      // update package.json file
      console.log(chalk.yellow('Updating package.json...'));
      // install dev dependencies
      const spinner2 = ora('Installing dev dependencies...').start();
      exec('npm install --save-dev @swc/core nodemon husky lint-staged');
      spinner2.succeed('Dev dependencies installed!');
  
      // show completion message
      console.log(chalk.green('Done! Your app has been created.'));
    } catch (error) {
      console.error(chalk.redBright("Error creating your dolph app"), error);
    }
    } catch (error) {
      console.error(chalk.redBright("Error creating your dolph app"), error);
    }
  });

program.parse(process.argv);
