import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    datepicker: "src/datepicker/index.ts",
    "card-input": "src/card-input/index.ts"
  },
  format: ["esm", "cjs"],
  splitting: false,
  dts: true,
  sourcemap: true,
  minify: true,
  clean: true,
});
