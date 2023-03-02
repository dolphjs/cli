import { writeFileSync } from "fs";

export default function writeNodemonFile (){
   const nodemonFile = {
      "watch": ["./src", ".env"],
      "ext": "js,ts,json",
      "ignore": ["src/logs/*", "src/**/*.{spec,test}.ts"],
      "exec": "ts-node -r tsconfig-paths/register --transpile-only src/index.ts"
   }

   writeFileSync('nodemon.json', JSON.stringify(nodemonFile, null, 2))
}