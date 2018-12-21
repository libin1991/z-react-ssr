const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const devMode = process.env.NODE_ENV === 'production';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const staticPath = devMode ? 'static/' : ''; // 静态文件路径，在 dev-server 模式中为空，不然会报文件路径错误

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },

    output: {
        path: path.resolve(__dirname, '../dist/', staticPath),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: `/${staticPath}` // 这里可设置项目 '绝对路径' 和 '相对路径'
    },

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: [
                    {
                        loader: 'happypack/loader?id=happyBabel'
                    }
                ],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024, // 小于 5k 的转成 base64 格式，大于的生成图片放到 image 中
                            outputPath: 'images',
                        }
                    }
                ]
            },
            {
                test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024,
                            outputPath: 'fonts',
                            publicPath: '../fonts/' // 因为引入位置在 css 中，所以单独设置相对路径
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },

    stats: {
        children: false,
        modules: false,
        warnings: false
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].[hash:8].css' : 'css/[name].css',
            chunkFilename: devMode ? 'css/[id].[hash:8].css' : 'css/[id].css'
        }),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new ProgressBarPlugin({
            format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false
        })
    ]
};
