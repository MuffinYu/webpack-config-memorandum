const path = require("path");

const Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const WebpackDevServer = require('webpack-dev-server'); //通过 npm 安装
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");

console.log('NODE_ENV', process.env.NODE_ENV);
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const Config = {
  entry: "./index.js",
  mode: isDev ? "development" : "production",
  output: {
    // 目录对应一个绝对路径
    path: path.resolve(__dirname, "dist"),
    filename: "webpack-config-memorandum.js"
  },
  devtool: isDev
    ? /*  'cheap-module-eval-source-map' */ "eval-source-map"
    : /* "cheap-eval-source-map" => 转换过的代码（仅限行）快，但不利于看 */
      "hidden-source-map",
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: "./dist",
              hmr: isDev
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: "./dist",
              hmr: isDev
            }
          },
          "css-loader",
          {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name].css`,
      chunkFilename: `[id].css`
    }),
    new WebpackBar(),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    !isDev && new BundleAnalyzerPlugin(),
    !isDev && new Webpack.NamedModulesPlugin(),
    !isDev && new Webpack.HotModuleReplacementPlugin()
  ].filter(Boolean)
};

// const compiler = Webpack(Config);
// console.log('compiler');

// const devServer = new WebpackDevServer(compiler, {
//   contentBase: path.join(__dirname, "dist"),
//   compress: true,
//   port: 9000,
//   quiet: true,
//   host: "localhost",
//   // hotOnly: true,
//   hot: true
// });
// devServer.listen( "9000", "localhost", err => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('server ok');
// });
module.exports = Config;