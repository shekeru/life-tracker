const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/Main.tsx',
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1337
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader', 'css-loader', 'postcss-loader', {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'node_modules/bootstrap/scss')]
                            }
                        }
                    }
                ]
            }, 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html/,
                use: ['html-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        filename: 'compiled.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/web', 'index.html')
        }), new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '' }]
        })
    ]
};