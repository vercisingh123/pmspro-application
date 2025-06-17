const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'bundle.js', // Output file
    clean: true, // Clean dist folder before build
    publicPath: '/', // Ensures assets resolve correctly with historyApiFallback[3]
  },
  mode: 'development', // <-- Move this to the root
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // For JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
      // Add more loaders as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
 devServer: {
  static: './dist',
  port: 3000,
  open: true,
  hot: true,
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  ],
  historyApiFallback: true,
},

};
