import { writeFileSync } from "fs";

export default function writeGitignoreFile(){
   const ignore = " node_modules \n yarn-error.log\nyarn.lock\npackage-lock.json\n.env\ncoverage\n.vscode\npkg\nassets\npackage-lock.json"

   const env = "DB_HOST= localhost\n DB_PORT= 3306\n DB_USER= myusername \n DB_PASSWORD = mypassword \n DB_NAME = mydatabase \n\n ### For MongoDB, \n DB_CONNECTION_STRING= mongodb://localhost:27017/mydatabase \n DB_NAME= mydatabase \n DB_USERNAME = username \n DB_PASSWORD = password \n\n NODE_ENV = development"
   writeFileSync('./.gitignore', ignore)
   writeFileSync('./.env', env);
}