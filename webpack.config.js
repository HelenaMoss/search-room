const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
  	filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  
  module: {
  	rules: [
  	
  		{
			test: /\.pug$/,
			use: ['pug-loader?pretty=true']
  		},

  {
      test: /\.(sass|scss)$/,
      use: [
      {
        loader: MiniCssExtractPlugin.loader, 
      }, 
          'css-loader',
          'sass-loader'
          ] 
      },

		{
  	    test: /\.(png|jpg|svg|tiff|gif)$/,
  	    use: ['file-loader'],
		},

		{
  	    test: /\.(ttf|woff|woff2|eot|otf)$/,
  	    use: ['file-loader']
		}

  	]
  },

devServer: {
	port: 4200,
	open: true
},

plugins: [
	new HtmlWebpackPlugin({
		template: './index.pug' 
	}),

	 	new CopyWebpackPlugin({
	patterns: [
		{
		from: path.resolve(__dirname, 'src/assets/img/pug'),
		to: path.resolve(__dirname, 'docs')
		}
  		]
	}),

	 	new CleanWebpackPlugin(),

	 	new MiniCssExtractPlugin({
	    filename: '[name].[contenthash].css'
	})	

	]
}

