const path = require('path')
const OutLogPlugin = require('./plugins/OutLogPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(`OutLogPlugin:`, OutLogPlugin)

module.exports = {
  // 打包模式，开发||生产
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  // 创建开发者服务器
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    contentBase: './dist',
    hot: true, // 热更新
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'console-loader',
          {
            loader: 'company-loader',
            options: {
              sign: 'we-doctor@2021',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new OutLogPlugin({ outFileName: 'buildInfo' }),
    new HtmlWebpackPlugin({
      // 用哪个html作为模板在public目录下创建一个index.html页面当做模板来用
      template: './public/index.html',
      hash: true,
    }),
  ],
  resolveLoader: {
    // 去哪些目录下寻找 Loader，有先后顺序之分 node_modules 如果没有就去./loaders目录下
    modules: ['node_modules', './loaders/'],
  },
  devtool: 'cheap-source-map',
}
