const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'bocombbm-mfe-poc.js'),
  output: {
    filename: 'bocombbm-mfe-poc.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: ''
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  externals: ['react', 'react-dom', 'single-spa', 'single-spa-react']
};


