const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/** ** */

const StatsGraphPlugin = require('./webpack/plugins/stats-graph-plugin');
/** ** */

const babelConfig = require('./config/babel');
const eslintConfig = require('./config/eslint');

const baseConfig = {
  mode: 'none',
  entry: { index: ['./src/index.js'] }, // , './src/index.scss'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // filename: '[name].bundle.js',
    filename: '[name].[hash:8].js',
    chunkFilename: 'vendor.[hash:8].js'
  },
  devtool: 'nosources-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
      // // name: false,
      // cacheGroups: {
      //   vendors: { test: /[\\/]node_modules[\\/]/, priority: -10 },
      //   default: { minChunks: 2, priority: -20, reuseExistingChunk: true }
      // }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*', 'statsgraph/*.*'], { root: __dirname }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[hash:8].css' }),
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
          'postcss-loader',
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
    return merge(baseConfig, eslintConfig, devServerConfig);
  }

  baseConfig.optimization.minimize = true;
  baseConfig.optimization.minimizer = [
    new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i
      // sourceMap: false
    })
  ];
  baseConfig.optimization.usedExports = true;
  baseConfig.optimization.sideEffects = true;
  baseConfig.plugins.push(new MinifyPlugin());
  return merge(baseConfig, babelConfig);
};
