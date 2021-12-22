const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              // eslint-disable-next-line no-process-env
              jsx: process.env.NODE_ENV === 'development' ?
                'react-jsxdev' :
                'react-jsx'
            }
          }
        },
        exclude: /node_modules/u
      },
      {
        test: /\.css$/u,
        exclude: /node_modules/u,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ]
};
