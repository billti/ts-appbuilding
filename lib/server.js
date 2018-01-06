"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const compression = require("compression");
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
//# sourceMappingURL=server.js.map