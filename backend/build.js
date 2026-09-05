import * as esbuild from "esbuild";
import { builtinModules } from "module";

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["src/index.ts"],
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20", // Adjust based on cPanel Node version
      outfile: "app.js",
      external: builtinModules,
      banner: {
        js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
      },
    });
    console.log("Build successful: app.js");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
