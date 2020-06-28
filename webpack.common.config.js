const path = require("path");

module.exports = {
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: "/node_modules/",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "server.js",
    },
};
