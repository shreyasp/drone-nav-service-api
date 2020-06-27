const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: ["webpack/hot/poll?100", "./src/server.ts"],
    watch: true,
    target: "node",
    externals: [
        nodeExternals({
            whitelist: ["webpack/hot/poll?100"],
        }),
    ],
    mode: "development",
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
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "server.js",
    },
};
