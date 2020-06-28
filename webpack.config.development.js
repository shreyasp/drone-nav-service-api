const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");

module.exports = merge(common, {
    entry: ["webpack/hot/poll?100", "./src/server.ts"],
    mode: "development",
    devtool: "inline-source-map",
    externals: [
        nodeExternals({
            whitelist: ["webpack/hot/poll?100"],
        }),
    ],
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
