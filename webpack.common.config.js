const path = require("path");
const { json } = require("express");

module.exports = {
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.yaml/,
                type: "json",
                use: "yaml-loader",
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
