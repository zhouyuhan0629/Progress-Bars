const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: './js/bundle.js'
    },
    module: {
        rules: [{
            // 匹配文件规则
            test: /\.css$/i,
            // use 从右至左进行应用
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Progress-Bars-Demo',
            template: path.resolve(__dirname, "./src/index.html"),
        }),
        // 提取 css 到单独的文件
        new MiniCssExtractPlugin({
            // 选项类似于 webpackOptions.output 中的相同选项，该选项是可选的
            filename: './css/index.css',
        })
    ],
};