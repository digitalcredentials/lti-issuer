const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    port: 3001,
    proxy: {
      "/": {
        target: "http://0.0.0.0:3000",
      },
    },
  },
});
