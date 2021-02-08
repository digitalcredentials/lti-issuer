const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const instructureUiConfig = require("@instructure/ui-webpack-config");

module.exports = {
  ...instructureUiConfig,
  context: path.resolve(__dirname, "client/src"),
  entry: {
    app: "./index.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      ...instructureUiConfig.module.rules,
    ],
  },
  plugins: [
    ...instructureUiConfig.plugins,
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HTMLWebpackPlugin({
      template: "index.html",
    }),
  ],
  resolve: { extensions: [".js", ".jsx"] },
  resolveLoader: {
    alias: { ...instructureUiConfig.resolveLoader.alias },
  },
};
