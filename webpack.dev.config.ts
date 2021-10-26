// import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'development',
    output: {
        publicPath: '/',
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
                test:/\.(png|jpg|gif|svg)$/,
                use : 'file-loader'
            },
            {
                test : /\.txt$/,
                use : 'raw-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: path.join(__dirname, "build"),
    //     historyApiFallback: true,
    //     port: 4000,
    //     open: true,
    //     hot: true
    // },
};

export default config;
