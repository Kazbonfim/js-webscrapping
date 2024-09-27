import React from 'react';
import ReactDOM from 'react-dom';
import Pokemon from './Pokemon'; // Ajuste o caminho se necessário

const PokemonApp = () => (
    <div className="header">
        <h1>Bem-vindo ao App de Scraping!</h1>
        <Pokemon />
    </div>
);

ReactDOM.render(<PokemonApp />, document.getElementById('pokemon-component'));