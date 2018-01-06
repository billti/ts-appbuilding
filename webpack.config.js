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
