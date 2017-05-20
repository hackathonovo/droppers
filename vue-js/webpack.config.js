/* eslint-env node */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const styleLoader = {
  use: [{
    loader: 'css-loader'
  }, {
    loader: 'postcss-loader'
  }, {
    loader: 'sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, './src/assets', 'stylesheets')
      ]
    }
  }],
  fallback: 'vue-style-loader'
};

const svgLoader = StringReplacePlugin.replace({
  replacements: [{
    pattern: /<!-- @svg\(\"(.*?)\"\) -->/ig,
    replacement(_, fileName) {
      const svgPath = path.join(__dirname, './src/assets/images/icons', `${fileName}.svg`);
      const svgFile = fs.readFileSync(svgPath, 'UTF-8');
      return svgFile || '';
    }
  }]
});

const outputFile = DEV ? '[name].[ext]' : '[name]-[hash].[ext]';

const config = {
  entry: {
    application: ['./src/main.js']
  },

  output: {
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets/',
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new StringReplacePlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],

  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.resolve(__dirname, './src/assets', 'stylesheets'),
      path.resolve(__dirname, './src/assets', 'images'),
      path.resolve(__dirname, './src/assets', 'fonts'),
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract(styleLoader)
          },
          cssModules: {
            camelCase: true
          }
        }
      }, {
        loader: svgLoader
      }]
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }, {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract(styleLoader)
    }, {
      test: /\.svg$/,
      loader: 'raw-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: `file-loader?name=images/${outputFile}`
    }, {
      test: /\.(eot|ttf|woff2?)$/,
      loader: `file-loader?name=fonts/${outputFile}`
    }]
  },
  devServer: {
    contentBase: __dirname,
    port: 3000
  }
};

module.exports = config;
