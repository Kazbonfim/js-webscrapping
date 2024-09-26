const path = require('path');

module.exports = {
    entry: './src/index.jsx', // Altere para .jsx se estiver usando esse formato
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development', // Adicione isto se não estiver configurado
};
