const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "data-table-bundle.js",
    library: 'data-table',
    libraryTarget: 'commonjs2'
  },
  devtool: 'eval-source-map', //remove in prod 
  plugins: [new BundleAnalyzerPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    writeToDisk: true,
    contentBase: path.join(__dirname, 'assets')
  }
};