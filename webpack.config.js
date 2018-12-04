const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/** ** */

const StatsGraphPlugin = require('./webpack/plugins/stats-graph-plugin');
/** ** */

const babelConfig = require('./config/babel');
const eslintConfig = require('./config/eslint');

const baseConfig = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // filename: '[name].bundle.js',
    filename: '[name].[hash:8].js',
    chunkFilename: 'vendor.[hash:8].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
      // name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*', 'statsgraph/*.*'], { root: __dirname }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash:8].css'
    }),
    new StatsGraphPlugin()
    // new webpackInfoPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/gi,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      // {
      //   test: /\.css$/g,
      //   // use: ['style-loader', 'css-loader']
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]_[local]_[hash:base64]',
      //         sourceMap: true,
      //         minimize: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.s?css/gi,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: { '~': path.resolve(__dirname, '../src') }
  }
};

module.exports = (env, argv) => {
  const aMode = argv.mode || argv.env;
  console.log(`argv.mode : ${aMode} build`);

  const isDevelopment = env === 'development';
  console.log(
    `This is a ${isDevelopment ? 'development' : 'production'} build`
  );

  baseConfig.plugins.push(
    new webpack.DefinePlugin({
      ENV_IS_DEVELOPMENT: isDevelopment,
      ENV_IS: JSON.stringify(env)
    })
  );

  if (isDevelopment) {
    const devServerConfig = {
      devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        watchContentBase: true,
        // hotOnly: false,
        overlay: true,
        hot: true
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
    };
    // const codeGenConfig = {};
    // console.log(merge(baseConfig, codeGenConfig, devServerConfig));
    return merge(baseConfig, babelConfig, eslintConfig, devServerConfig);
  }
  return merge(baseConfig, babelConfig, eslintConfig);
};
