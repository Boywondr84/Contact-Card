const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },
    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Webpack Plugin',
        }),
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: './service-worker.js'
        })
        //     exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        //     runtimeCaching: [{
        //         urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        //         handler: 'CacheFirst',

        //         options: {
        //             cacheName: 'images',

        //             expiration: {
        //                 maxEntries: 1,
        //             },
        //         },
        //     }],
        // })
    ]
};