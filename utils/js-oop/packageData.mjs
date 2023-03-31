import { writeFileSync} from 'fs'

export default function writeFilePackageJs(appName){
   const packageJsonData = {
      name: appName,
      version: '1.0.0',
      description: '',
      main: 'src/index.js',
      scripts: {
        start: 'nodemon swc src/index.js',
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