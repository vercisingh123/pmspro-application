// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './src/index.js', // Entry point
//   output: {
//     path: path.resolve(__dirname, 'dist'), // Output folder
//     filename: 'bundle.js', // Output file
//     clean: true, // Clean dist folder before build
//     publicPath: '/', // Ensures assets resolve correctly with historyApiFallback[3]
//   },
//   mode: 'development', // <-- Move this to the root
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, // For JS and JSX files
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/, // For CSS files
//         use: ['style-loader', 'css-loader'],
//       },
//       // Add more loaders as needed
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//   ],
//  devServer: {
//   static: './dist',
//   port: 3000,
//   open: true,
//   hot: true,
//   proxy: [
//     {
//       context: ['/api'],
//       target: 'http://65.0.107.174/:4999',
//       changeOrigin: true,
//     },
//   ],
//   historyApiFallback: true,
// },

// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'), // Use 'dist' as your output folder
      filename: 'bundle.js',
      publicPath: '/', // Needed for SPA routing
      clean: true,
    },
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
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
      new Dotenv({
        path: isProduction ? './.env' : './.env', // You can use .env.production/.env.development if you wish[1][5]
        systemvars: true, // Also load system environment variables
      }),
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://65.0.107.174:4999', // Fixed typo: no colon before port
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
        },
      },
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
    },
    // Optional: add optimization, source maps, etc. as needed
  };
};
