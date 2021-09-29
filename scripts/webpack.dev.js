const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')
const portfinder = require('portfinder')
const { BASE_PROT } = require('./utils/constant')
const ESLintPlugin = require('eslint-webpack-plugin')

portfinder.basePort = BASE_PROT

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    static: {
      directory: path.join(__dirname, '../public'),
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: BASE_PROT,
    // 代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, '../'),
      fix: true,
      files: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
}

module.exports = async function () {
  try {
    // 端口被占用时候 portfinder.getPortPromise 返回一个新的端口(往上叠加)
    const port = await portfinder.getPortPromise()
    devConfig.devServer.port = port
    return merge(devConfig, baseConfig)
  } catch (e) {
    throw new Error(e)
  }
}
