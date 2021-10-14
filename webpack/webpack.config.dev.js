const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common");
const apiMocker = require("mocker-api");

const paths = require("./paths");

const needMock = process.env.MOCK === "mock";


// const _environment = 'https://dp.clife.net';
// const _environment = 'https://200.200.200.50';
// const _environment = 'https://cms.clife.cn/';
const _environment = 'https://itest.clife.net/';


const dev = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: paths.outPath,
    host: "localhost",
    port: "8085",
    open: true,
    openPage: "",
    hot: true, //webpack-dev-server are launched with the --hot option, webpack.HotModuleReplacementPlugin will be added automatically
    before: function (app) {
      if (needMock) {
        apiMocker(app, path.resolve(__dirname, "../src/mock/index.js"));
      }
    },
    proxy: {
      "/v4/web/": {
        target: _environment,
        changeOrigin: true,
        secure: false,
      },
      "/v5x/web/": {
        target: _environment,
        // target: "http://10.8.80.120:8080",
        changeOrigin: true,
        secure: false,
      },
      "/v6/web/": {
        target: 'http://10.6.50.78:7771',
        // target: "http://10.8.80.120:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

module.exports = merge(common, dev);
