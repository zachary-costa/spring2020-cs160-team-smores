const path = require('path')
const env = require('dotenv')
env.config()

module.exports = {
  entry: {
    main: './src/client/index.tsx'
  },
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['/node_modules/', '/src/server/']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../', process.env.PUBLIC_DIR)
  }
};
