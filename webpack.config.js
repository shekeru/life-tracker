const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/Main.tsx',
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1337
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
        filename: 'compiled.js',
        path: path.resolve(__dirname, 'public/src'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};