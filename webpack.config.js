const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname+'/build',
        filename: "app.bundle.js"
    },
    devServer: {
        inline: false,
        contentBase: "./build",
    },
    target : 'node',
    externals : [nodeExternals()],
    module: {
        loaders: [{ 
            test: /\.js?$/, 
            loader: "babel-loader",
            query: {
                presets : ['es2017']
            }
        },{ test: /\.json$/, loader: 'json-loader' }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
         new CopyWebpackPlugin([{from : './resources/auditoria', to:'./resources/auditoria'}, 
                                {from : './resources/Vorstellungen.txt', to:'./resources/Vorstellungen.txt'},
                                ])
    ]
};