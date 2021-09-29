const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { separator } = require('./utils/constant')
const { getEntryTemplate } = require('./utils/helper')

// 将packages拆分成为数组 ['editor','home']
const packages = process.env.packages.split(separator)

// 调用getEntryTemplate 获得对应的entry和htmlPlugins
const { entry, htmlPlugins } = getEntryTemplate(packages)

module.exports = {
  // 动态替换entry
  entry,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@layout': path.resolve(__dirname, '../src/layout'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.scss', 'json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 同时动态生成对应的htmlPlugins
    ...htmlPlugins,
  ],
}
