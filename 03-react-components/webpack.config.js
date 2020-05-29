const path = require('path')
module.exports = {
  entry: './src/app.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    publicPath: "http://localhost:8080/dist/",
  }
};
