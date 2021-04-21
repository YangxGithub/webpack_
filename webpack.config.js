const path = require("path")
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 打包前清除上一次打的包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  favicon: path.resolve('public/favicon.ico')
})
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "./src/js/index.js"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/bundle.js", // 输出指定为js文件夹下的bundle.js
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlWebpackPlugin
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 13000,
            esModule: false,
            name: 'images/[name].[hash:8].[ext]'
          }
        }]
      },
      // 指定除html,css,png,jpg,js之外的资源用file-loader处理
      {
        exclude:/\.(html|css|png|jpg|js)/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  // 启动一个服务
  devServer:{
    contentBase:path.resolve(__dirname,'dist'), // 指定目录
    compress:true, // 压缩是否开启
    port:9000,// 端口号
    open:true // 自动打开
  }
}