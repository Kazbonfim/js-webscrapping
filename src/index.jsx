import React from 'react';
import ReactDOM from 'react-dom';
import Countries from './Countries'; // Ajuste o caminho se necessário

const App = () => (
    <div className="header">
        <h1>Bem-vindo ao App de Scraping!</h1>
        <Countries />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
