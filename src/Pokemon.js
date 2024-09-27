import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Mapeamento de cores em RGBA com transparência de 0.5
    const versionColors = {
        "red-blue": "rgba(255, 0, 0, 0.5)", // Vermelho
        "yellow": "rgba(255, 255, 0, 0.5)", // Amarelo
        "gold-silver": "rgba(255, 215, 0, 0.5)", // Dourado
        "crystal": "rgba(0, 191, 255, 0.5)", // Azul
        "ruby-sapphire": "rgba(255, 69, 0, 0.5)", // Laranja
        "emerald": "rgba(0, 128, 0, 0.5)", // Verde
        "firered-leafgreen": "rgba(139, 0, 0, 0.5)", // Vermelho escuro
        "diamond-pearl": "rgba(176, 196, 222, 0.5)", // Azul claro
        "platinum": "rgba(218, 165, 32, 0.5)", // Dourado escuro
        "heartgold-soulsilver": "rgba(192, 192, 192, 0.5)", // Prata
        "black-white": "rgba(0, 0, 0, 0.5)", // Preto e Branco
        "colosseum": "rgba(112, 128, 144, 0.5)", // Cinza
        "xd": "rgba(123, 104, 238, 0.5)" // Azul médio
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get('/scrapp-pokemon'); // Rota que retorna os dados do back-end
                setPokemon(response.data.games);
                console.log('Debug1 em src/Pokemon.js \n', response);
            } catch (err) {
                setError('Erro ao carregar os dados da PokéApi');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pokemon-lista">
            <h1>Lista de Pokémon - React</h1>
            <div className="pokemon-container">
                {pokemon.map((pokemon, index) => (
                    <div
                        className="pokemon-card"
                        key={index}
                        style={{ backgroundColor: versionColors[pokemon.version] || 'rgba(249, 249, 249, 0.5)' }} // Aplica a cor com base na versão
                    >
                        <strong>Pokémon:</strong> {pokemon.name}
                        <br />
                        <strong>Grupo:</strong> {pokemon.version}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pokemon;
