import { readFileSync } from "node:fs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default {
  input: "src/index.ts",
  output: {
    file: "dist/rohlik-cards.js",
    format: "es",
    sourcemap: false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json", noEmitOnError: true, declaration: false }),
    replaceVersion(pkg.version),
    terser(),
  ],
};

function replaceVersion(version) {
  return {
    name: "replace-version",
    transform(code, id) {
      if (!code.includes("__ROHLIK_CARDS_VERSION__")) return null;
      return {
        code: code.replaceAll("__ROHLIK_CARDS_VERSION__", JSON.stringify(version)),
        map: null,
      };
    },
  };
}
