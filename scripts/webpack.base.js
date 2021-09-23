const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 入口文件，这里之后会着重强调
  entry: {
    main: path.resolve(__dirname, '../src/packages/home/index.tsx'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
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
              sourceMap: true
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline'
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
  ]
};
