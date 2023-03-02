import { writeFileSync } from "fs";

export default function writeGitignoreFile(){
   const ignore = " node_modules \n yarn-error.log\nyarn.lock\npackage-lock.json\n.env\ncoverage\n.vscode\npkg\nassets\npackage-lock.json"
   writeFileSync('./.gitignore', ignore)
}