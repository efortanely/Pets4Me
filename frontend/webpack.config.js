const path = require('path');

module.exports = {
  entry: './src/App.tsx',

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            presets: ['@babel/preset-react'],
            presets: ['@babel/preset-typescript']
          }
        }
      },
    ],
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@app': path.resolve(__dirname, 'src/')
    }
  },

output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  mode: 'development'
}