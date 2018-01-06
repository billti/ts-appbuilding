# Building the source

In order to convert the TypeScript to runable JavaScript, setting up builds for
the server and client code is required.

## Building the server code
The server code is relatively straight forward, as this is just a one-on-one mapping
of source modules from `/src/lib` to runtime modules under `/lib`.

Add a skeleton source file at `/src/lib/server.ts` with the below content:

```ts
import util = require("util");
console.log(`Running code in module ${__filename}`);
console.log(`Node.js versions: ${util.format("%j", process.versions)}`);
```

Add a configuration file to `/src/lib/tsconfig.json` with the following lines:

```js
{
  "compilerOptions": {
    "module": "commonjs",   // Emit CommonJS format modules
    "target": "es2015",     // Emit ES2015 compatible JavaScript code
    "lib": ["es2015"],      // Using the ES2015 core libraries (e.g. Promise, Map, etc.)
    "sourceMap": true,      // Emit source maps beside the generated JavaScript
    "outDir": "../../lib"   // Write generated code to the project's /lib folder
  }
}
```

Install the latest TypeScript packages locally for building, along with the type definitions
for Node.js.

```bat
REM tslib is used later when importing the runtime helper functions
npm install --save-dev typescript tslib @types/node
```

Edit `package.json` to add the script to build the server code.

```js
{ // Other package.json fields...
  "scripts": {
    "build:server": "tsc -p ./src/lib"
  }
}
```

Run the command `npm run build:server` and the `server.js` and `server.map` files should
be written to the `/lib` folder. Update the `server.js` file at the root of the package
to simply load this, namely:

```js
const server = require('./lib/server.js');
```

Running the command `npm start` should execute the compiled TypeScript code written above.

## Building the client code
Create another TypeScript configuration file for the client code at `/src/public/scripts/tsconfig.json`:

```js
{
  "compilerOptions": {
    "module": "es2015",         // Emit ES2015-style modules
    "moduleResolution": "node", // Resolve imports using Node.js resolution
    "sourceMap": true,          // Emit source maps for generated code
    "target": "es5",            // Target ES5 compatible engines
    "importHelpers": true,      // Consume runtime helpers via imports
    "outDir": "../build"        // Write generated code to /src/public/build
  }
}
```

Add a simple file at `/src/public/scripts/app.ts`, e.g.

```ts
document.writeln("Loading...");
export default {"version": "1.0.0"};
```

Update the scripts in `package.json` to build the client code, i.e.

```js
{ // Other fields...
  "scripts": {
    "build:server": "tsc -p ./src/lib",
    "build:client": "tsc -p ./src/public/scripts"
  }
}
```

Test the build by running `npm run build:client`, and the .js and .map files should be
generated under "/src/public/build". (Add a line reading `src/public/build/` to the
`.gitignore` file if you do not want these files in source control).

_continue on to [webpack](webpack.md)_
