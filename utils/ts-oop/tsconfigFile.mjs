import { writeFileSync } from "fs";

const tsconfig = {
   "compilerOptions": {
       "target": "es2018",
       "module": "commonjs",
       "rootDir": "./src",
       // "types": [
       //     "./types"
       // ],
       "declaration": true,
       "declarationMap": true,
       "sourceMap": true,
       "outDir": "./dist",
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true,
       "moduleResolution": "node",
       "lib": [
           "es2017",
           "esnext.asynciterable"
       ],
       "typeRoots": [
           "node_modules/@types"
       ],
       "allowSyntheticDefaultImports": true,
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true,
       "pretty": true,
       "resolveJsonModule": true,
       "importHelpers": true,
       "allowJs": true,
       "noEmit": false,
       "baseUrl": "src",
       "paths": {
           "@/*": [
               "*"
           ],
           "@config/*": [
               "config/*"
           ],
           "@controllers/*": [
               "controllers/*"
           ],
           "@dtos/*": [
               "dtos/*"
           ],
           "@exceptions/*": [
               "exceptions/*"
           ],
           "@interfaces/*": [
               "interfaces/*"
           ],
           "@middlewares/*": [
               "middlewares/*"
           ],
           "@routes/*": [
               "routes/*"
           ],
           "@services/*": [
               "services/*"
           ],
           "@utils/*": [
               "utils/*"
           ]
       }
   }
}

export default function writeTsconfigFile(){
    writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2))
}