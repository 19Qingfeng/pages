const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { MAIN_FILE } = require('./constant')

// 获取多页面入口文件夹中的路径
const dirPath = path.resolve(__dirname, '../../src/packages')

// 用于保存入口文件的Map对象
const entry = Object.create(null)

// 读取dirPath中所有的的文件夹个数
// 同时保存到entry中  key为文件夹名称 value为文件夹路径
fs.readdirSync(dirPath).filter(file => {
  const entryPath = path.join(dirPath, file)
  if (fs.statSync(entryPath)) {
    entry[file] = path.join(entryPath, MAIN_FILE)
  }
})

// 根据入口文件list生成对应的htmlWebpackPlugin
// 同时返回对应wepback需要的入口和htmlWebpackPlugin
const getEntryTemplate = packages => {
  const entry = Object.create(null)
  const htmlPlugins = []
  packages.forEach(packageName => {
    entry[packageName] = path.join(dirPath, packageName, MAIN_FILE)
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../public/index.html'),
        filename: `${packageName}.html`,
        chunks: ['manifest', 'vendors', packageName],
      })
    )
  })
  return { entry, htmlPlugins }
}

module.exports = {
  entry,
  getEntryTemplate,
}
