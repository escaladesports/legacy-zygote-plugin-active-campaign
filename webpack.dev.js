const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    plugins: [
        ...common.plugins,
        new webpack.HotModuleReplacementPlugin()
    ]
})