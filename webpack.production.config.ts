import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import dotenv from 'dotenv';
import loadEnv from './env/loadEnv';

export default (env) => {
    dotenv.config({
        path: path.resolve(__dirname, `./env/${env.mode}.env`),
    });

    return {
        mode: 'production',
        output: {
            publicPath: './',
            filename: 'bundle.[hash].js',
            sourceMapFilename: 'bundle.[hash].js.map',
        },
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
                    configFile: path.resolve(__dirname, './tsconfig.json'),
                }),
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin({
                'process.env': loadEnv(process.env),
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [path.resolve(__dirname, './dist')],
            }),
        ],
        devtool: 'inline-source-map',
    };
};
