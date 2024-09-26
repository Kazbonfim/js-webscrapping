import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = () => {
    const [paises, setPaises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/scrapp-countries'); // Rota que retorna os dados do back-end
                setPaises(response.data.listagem);
            } catch (err) {
                setError('Erro ao carregar os países');
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="countries-lista">
            <h1>Lista de Países - React</h1>
            <ul>
                {paises.map((pais, index) => (
                    <li key={index}>
                        <strong>País:</strong> {pais.nome}, <strong>Capital:</strong> {pais.capital}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Countries;
