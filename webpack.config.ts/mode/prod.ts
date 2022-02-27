import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';

module.exports = () => {
    return {
        mode: 'production',
        output: {
            publicPath: './',
            filename: 'bundle.[hash].js',
            sourceMapFilename: 'bundle.[hash].js.map',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [path.resolve(__dirname, './dist')],
            }),
        ],
        devServer: {
            port: 4000,
        },
    };
};
