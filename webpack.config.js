const path = require('path')
const webpack = require('webpack')
const CssPathTransfor = require('./plugins/CssPathTransfor')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(`CssPathTransfor`, CssPathTransfor)

module.exports = {
  // 环境
  mode: 'development',
  // 入口文件
  entry: {
    app: './src/index.js',
  },
  // 输出文件
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', //确保文件资源能够在 http://localhost:3000 下正确访问
  },
  // 开发者工具 source-map
  devtool: 'inline-source-map',
  // 创建开发者服务器
  devServer: {
    contentBase: './dist',
    hot: true, // 热更新
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ['uppercase-loader', 'reverse-loader'],
      },
    ],
  },
  plugins: [
    new CssPathTransfor(),
    // 删除dist目录
    // new CleanWebpackPlugin(['dist']),
    // 重新穿件html文件
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template:'./public/index.html'
    }),
    // 以便更容易查看要修补(patch)的依赖
    // new webpack.NamedModulesPlugin(),
    // 热更新模块
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    // 去哪些目录下寻找 Loader，有先后顺序之分 node_modules 如果没有就去./loaders目录下
    modules: ['node_modules', './loaders/'],
  },
}
