# Using JSX

In this section, the client code will be configured to use JSX and the Preact library.

To being, install the Preact library (a React-like front-end framework). Note that no @types
packages are necessary, as it ships the type definitions within the npm package itself.

```
npm install --save-dev preact
```

Update the `tsconfig.json` file under `/src/public/scripts` with the necessary compiler options:

```json
  "compilerOptions": {
    "jsx": "react",             // Convert JSX to React API calls
    "jsxFactory": "h",          // Use the 'h' function to create elements
    // etc.
  }
```

Rename the file at `/src/public/scripts/app.ts` to `app.tsx`, and change the contents to:

```tsx
import { h, render } from "preact";

window.onload = () => {
    const loading = document.getElementById("loading");
    render((<div>
        <h1>Hello, world</h1>
        <p>This page rendered using Preact & JSX. See https://preactjs.com</p>
    </div>), document.body, loading);
};
```

Build the client and bundle the code again by running:

```bat
npm run build:client
npm run bundle
```

Observe that as Preact has a "module" field set in its "package.json" file, webpack will resolve
to this file (which uses ES2015 module syntax) and bundle Preact along with the local application code.

The bundle.js file at this point includes the original source for the local code and Preact, unminified
and including comments. At 35kb this is pretty small, but it can be reduced significantly with tree-shaking
and minification. 

This can be done by just launching webpack with the `-p` switch. (See details at https://webpack.js.org/guides/production/#cli-alternatives). Run the below command:

```bat
npx webpack -p
```

This will automatically pick up the local `webpack.config.js` file, and also apply the tree-shaking and
minification plug-ins. Note now how the `bundle.js` file is now a tiny 9kb.

As one last optimization, add a general "build" script to `package.json` to run all build steps.

```
"build": "npm run build:server && npm run build:client && npm run bundle",
```