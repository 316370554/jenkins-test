let path = require('path');
let webpack = require('webpack');
let server = require('webpack-dev-server');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log(server);
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = config = {
    resolve: {
        // 设置别名
        // alias: {
        //     '@cesium': path.resolve(__dirname, 'src/_cesium')
        // },
        extensions: ['.ts', '.js']
    },
    mode: 'development',
    //mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/index.ts'
    },
    output: {
        publicPath: "./static/",
        path: path.join(__dirname, 'static'),
        filename: "js/[name].js"
    },

    performance: {//屏蔽掉WebPack 警告WARNING in asset size limit
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000 // 整数类型（以字节为单位）
    },
    devServer: {
        port:8088,
        static: {
            directory: path.join(__dirname)
        },
        hot: false
    },
    plugins: [
        new CleanWebpackPlugin(['static/js', 'static/img']),
        // new MiniCssExtractPlugin({
        //     filename: `${appVersion}/[name].css`,
        //     }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),

        new NodePolyfillPlugin()
    ],
    
    module: {
        rules: [
            { 
                test: /\.ts$/, 
                loader: "ts-loader",
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash].[ext]'
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                    },
                    'less-loader'
                ],
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                
            },
            { 
                test: /\.(frag|vert)?$/, 
                loader: "raw-loader" 
            }
        ]
      }
};