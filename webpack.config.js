const path = require('path');

module.exports = {
    entry: {
        countries: './src/countries-index.jsx',
        pokemon: './src/pokemon-index.jsx'
    },
    output: {
        filename: '[name].bundle.js', // Gera "countries.bundle.js" e "pokemon.bundle.js"
        path: path.resolve(__dirname, 'public/javascripts'), // Caminho para a pasta de saída
        clean: false, // Não limpa a pasta de saída antes de cada build
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Procura por arquivos .js e .jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Usar Babel para transpilar
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Presets para ES6 e React
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Permite importar arquivos sem especificar a extensão
    },
};
