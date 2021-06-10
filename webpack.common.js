const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
        resolve: { extensions: [".js", ".jsx"] },
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HTMLWebpackPlugin({
      template: "index.html",
    }),
  ],
  resolve: { extensions: [".js", ".jsx"] },
};
