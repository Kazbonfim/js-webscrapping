import React, { useEffect, useState } from 'react';
import axios from 'axios';

// console.log(`Resultado JSON: Pokémon ${gameDetails.data.name}, Grupo: ${gameDetails.data.version_group.name}`);

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get('/scrapp-pokemon'); // Rota que retorna os dados do back-end
                setPokemon(response.data.games);
                console.log(response);
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
        <div className="countries-lista">
            <h1>Lista de Pokémon - React</h1>
            <ul>
                {pokemon.map((pokemon, index) => (
                    <li key={index}>
                        <strong>Pokémon:</strong> {pokemon.name}, <strong>Grupo:</strong> {pokemon.version}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pokemon;
