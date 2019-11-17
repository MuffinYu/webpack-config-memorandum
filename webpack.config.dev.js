const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const path = require('path');
const config = require("./webpack.config.js");

const options = {
  contentBase: path.join(__dirname, "dist"),
  hot: true,
  host: "localhost",
  quiet: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(9000, "localhost", () => {
  console.log("dev server listening on port 9000");
});