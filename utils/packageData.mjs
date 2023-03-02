import { writeFileSync} from 'fs'

export default function writeFilePackage(appName){
   const packageJsonData = {
      name: appName,
      version: '0.1.0',
      description: '',
      main: 'src/index.ts',
      scripts: {
        start: 'nodemon --exec swc src/index.ts',
        build: 'tsc -p .',
        lint: 'eslint .',
        'lint:fix': 'eslint . --fix',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      dependencies: {},
    };
    writeFileSync(`./package.json`, JSON.stringify(packageJsonData, null, 2));
}