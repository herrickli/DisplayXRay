var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //entry: {index: './src/index.js'},
    //devtool: 'eval-source-map',
    entry: {
      index: './src/index.js', 
      popImg: './src/popImg.js',
    },
    output: {
        publicPath: './',
        path: __dirname + '/dist',
        filename: 'js/[name].bundle.js',
    },
    node: {
        fs: "empty"
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        chunks: ['index'],
    }),
      new HtmlWebpackPlugin({
        template: './src/popImg.html',
        filename: 'popImg.html',
        inject: 'body',
        chunks: ['popImg'],
      })],
    module: {
        rules: [
          {
            test: /\.(png|jpg|gif|JPEG)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    
                    //name: 'images/[name].[ext]',
                    outputPath: './images/',
                    name: '[name].[ext]',
                    esModule: false,
                }
              }
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ]
    }
};