import { writeFileSync } from "fs";

export default function writeFileSwcrc() {
  const swrc = {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: false,
        dynamicImport: true,
        decorators: true,
      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true,
      },
      target: "es2017",
      externalHelpers: false,
      keepClassNames: true,
      loose: false,
      minify: {
        compress: false,
        mangle: false,
      },
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
        "@constants/*": ["constants/*"],
        "@validations/*": ["validations/*"],
      },
    },
    module: {
      type: "commonjs",
    },
  };

  writeFileSync(".swcrc", JSON.stringify(swrc, null, 2));
}
