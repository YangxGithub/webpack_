const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 打包前清除上一次打的包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template:'./src/index.html',
	filename:'index.html',
	favicon: path.resolve('public/favicon.ico')
})
module.exports = {
	mode:'development',
	entry:path.join(__dirname,"./src/js/index.js"),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:"bundle.js",
	},
	plugins:[
		new CleanWebpackPlugin(),
		htmlWebpackPlugin
	],
	module:{
		rules:[{
			test:/\.css$/,use:['style-loader','css-loader']
		},
		{
    	test: /\.(htm|html)$/i,
     	use:[ 'html-withimg-loader'] 
		},
		{ test: /\.png$/, use:[{loader: 'url-loader',options:{limit: 13000,esModule: false,name: 'images/[name].[hash:8].[ext]'}}] }
		]
	}
}