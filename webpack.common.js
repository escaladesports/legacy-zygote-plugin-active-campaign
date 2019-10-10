const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        classes: path.resolve(__dirname, 'src/classes/index.js'),
        components: path.resolve(__dirname, 'src/components/index.js'),
        utils: path.resolve(__dirname, 'src/utils/index.js'),
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new CleanWebpackPlugin()],
    target: `web`
};