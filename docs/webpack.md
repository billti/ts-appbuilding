# Setting up webpack

Install webpack for use in the project:

```bat
npm install --save-dev webpack source-map-loader
```

Add an npm script named "bundle" to run it:

```js
{ // Other package.json fields...
  "scripts": {
    "bundle": "webpack --config webpack.config.js"
  }
}
```

Add the `webpack.config.js` file to the root folder with the below configuration
to bundle the generated client code. The `source-map-loader` loader is used to ensure
the final webpack bundle has source mapping all the way back to the original TypeScript code.

```js
const path = require("path");
module.exports = {
    entry: "./src/public/build/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/scripts")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    }
};

```

Run the below command, and verify it completes successfully:

```bat
npm run bundle
```

A file should be created at `./public/scripts/bundle.js` with a bunch of webpack runtime code
at the start, and the contents from the input file near the end.

NOTE: This configuration does not currently use the webpack-dev-server, or hot module reloading.

_continue on to [Express](express.md)_
