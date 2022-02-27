import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

module.exports = () => {
    return {
        mode: 'development',
        output: {
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            port: 4000,
        },
    };
};
