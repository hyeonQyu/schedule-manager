const webpack = require('webpack');
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const manifest = require('../public/manifest.json');
const dotenv = require('dotenv');
const loadEnv = require('./env/loadEnv');

module.exports = (mode) => {
    dotenv.config({
        path: path.resolve(__dirname, `./env/${mode}.env`),
    });

    return {
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                        }, // creates style nodes from JS strings
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                                sourceMap: true,
                            },
                        }, // translates CSS into CommonJS
                        {
                            loader: 'resolve-url-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        }, // compiles Sass to CSS, using Node Sass by default
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: 'file-loader',
                },
                {
                    test: /\.txt$/,
                    use: 'raw-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, '../tsconfig.json'),
                }),
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin({
                'process.env': loadEnv(process.env),
            }),
            /** PWA 관련 플러그인 */
            new WebpackPwaManifest(manifest),
            new InjectManifest({
                swSrc: '/public/service-worker.js',
                swDest: 'service-worker.js',
            }),
        ],
        devtool: 'inline-source-map',
    };
};
