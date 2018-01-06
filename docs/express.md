# Running express

Install the necessary packages

```bat
npm install --save express compression
npm install --save-dev @types/express @types/compression
```

Update `/src/lib/server.ts` to start Express and serve the content:

```ts
import path = require("path");
import express = require("express");
import compression = require("compression");

// Note: When running in Azure, PORT may be a pipe (e.g. something like "\\.\pipe\<GUID>")
const port = process.env["PORT"] || 8080;
const isProd = process.env["NODE_ENV"] === "production";

const app = express();

if (isProd) {
    app.use(compression());
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Serving ${publicPath} on port ${port}`));
```

Create a simple default page at `/public/index.html` that loads the bundle, such as:

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="/scripts/bundle.js"></script>
    </head>
    <body><div id="loading">Loading...</div></body>
</html>
```

Run the server with `npm start`, and open `http://localhost:8080` in the browser. Open the
DevTools, and observe how debugging the original source is available via the emitted source-maps.

_Continue on to [JSX](jsx.md)_
