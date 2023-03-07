import { Command } from 'commander';
import { execSync, spawn, spawnSync } from 'child_process';
import chalk from 'chalk';
import { accessSync } from 'fs';

const program = new Command();

program
  .command('start <appName>')
  .description('Starts the DolphJS app')
  .action((appName) => {
    try {
      execSync(`cd ${appName}`)
    } catch (err) {
      console.error(chalk.red(`Error: ${appName} does not exist or does not have an index.ts file.😔`));
      process.exit(1);
    }

    process.chdir(appName)

    const child = spawn(`npm start `);

    child.on('error', (err) => {
      console.error(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    });

    child.on('exit', (code, signal) => {
      if (signal) {
        console.error(chalk.red(`Process was killed with signal: ${signal}`));
        process.exit(1);
      } else if (code !== 0) {
        console.error(chalk.red(`Process exited with code: ${code}`));
        process.exit(1);
      } else {
        console.log(chalk.green('DolphJS app has been started.'));
      }
    });
  });


  program.parse(process.argv)