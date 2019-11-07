const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        'viewer': "./src/viewer/viewer.js",
    },
    module: {
        noParse: /gl-viewport/,
        rules: [
            {
                test: /\.css$|\.svg$/,
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'res', to: './res' },
            { from: 'src/viewer/viewer.html', to: './index.html' },
            { from: 'src/viewer/viewer.css', to: './' }
        ]),
    ],
}