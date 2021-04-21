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
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //  从js中提取css
process.env.NODE_ENV = 'development' 
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "./src/js/index.js"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/bundle.js", // 输出指定为js文件夹下的bundle.js
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlWebpackPlugin,
    new MiniCssExtractPlugin({
      // 对输出的css文件指定存放路径以及命名
      filename: 'css/style.css'
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          // 创建style便签 将样式放入
          // 'style-loader',
          // 这个loader 取代style-loader,作用:将js的css提取成为单独的css文件
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../'
            } // 解决使用MiniCssExtractPlugin后css的背景图出不来问题
          },
          // 将css文件整合到js文件中
          'css-loader',
          // css 兼容处理 postcss-loader postcss-preset-env
          /**
           * "browserslist":{
              "development":[
                "last 1 chrome version", 兼容最近版本的1个谷歌浏览器
                "last 1 firefox version",
                "last 1 safari version"
              ],
              "production":[
                ">0.2%", 兼容98%的浏览器
                "not dead", 死掉的浏览器不要
                "not op_mini all" Open迷你不要
              ]
            }
           */
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:() => {
                require('postcss-preset-env')()
              }
            }
          }
        ]
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
            name: '[hash:8].[ext]',
            outputPath:'imgs' // 指定图片输出到images文件夹下
          }
        }]
      },
      // 指定除html,css,png,jpg,js之外的资源用file-loader处理
      {
        exclude:/\.(html|css|png|jpg|js)/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'other' // 指定资源输出到other目录下
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