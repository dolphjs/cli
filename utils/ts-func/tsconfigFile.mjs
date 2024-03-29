import { writeFileSync } from "fs";

const tsconfig = {
  compileOnSave: false,
  compilerOptions: {
    target: "es2017",
    lib: ["es2017", "esnext.asynciterable"],
    typeRoots: ["node_modules/@types"],
    allowSyntheticDefaultImports: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    forceConsistentCasingInFileNames: true,
    moduleResolution: "node",
    module: "commonjs",
    pretty: true,
    sourceMap: true,
    declaration: true,
    outDir: "dist",
    allowJs: true,
    noEmit: false,
    esModuleInterop: true,
    resolveJsonModule: true,
    importHelpers: true,
    baseUrl: "src",
    paths: {
      "@/*": ["*"],
      "@config/*": ["config/*"],
      "@controllers/*": ["controllers/*"],
      "@database/*": ["database/*"],
      "@dtos/*": ["dtos/*"],
      "@exceptions/*": ["exceptions/*"],
      "@interfaces/*": ["interfaces/*"],
      "@middlewares/*": ["middlewares/*"],
      "@models/*": ["models/*"],
      "@routes/*": ["routes/*"],
      "@services/*": ["services/*"],
      "@util/*": ["util/*"],
      "@lib/*": ["lib/*"],
      "@servers/*": ["servers/*"],
      "@constants/*": ["constants/*"],
      "@validations/*": ["validations/*"],
    },
  },
  include: ["src/", ".env"],
  exclude: ["node_modules", "src/http", "src/logs", "src/tests"],
  "ts-node": {
    compilerOptions: {
      module: "CommonJS",
    },
  },
};

export default function writeTsconfigFile() {
  writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
}
