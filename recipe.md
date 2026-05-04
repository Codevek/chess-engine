# InitialSetup

``` bash
mkdir code-engine
cd code-engine
npm init -y
npm install typescript tsup --save-dev
npx tsc --init
```

1. "tsup" ---

A bundler built on esbuild.
It compiles and bundles your TypeScript/JavaScript code into optimized output (like dist/).
Think of it as a faster alternative to Webpack/Rollup for small-to-medium projects.

2. "--save-dev" ---

Installs these packages as development dependencies.
Meaning: they’re needed while developing (compiling, bundling, testing), but not required when your app runs in production.
They’ll be listed under "devDependencies" in your package.json.

3. "tsc" ---

The TypeScript compiler command.
It’s the actual tool that compiles .ts files into .js.

4. "--init" ---
 
Special flag that tells tsc to generate a tsconfig.json file.
This file stores compiler options (like target JS version, module system, strictness, include/exclude paths).
It’s basically the “settings file” for TypeScript in your project.