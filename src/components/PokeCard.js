import React, { useEffect, useState } from 'react';
import './PokeCard.css'
import axios from 'axios';

function PokeCard({ pokemonName }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                setPokemon(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemon();
    }, [pokemonName]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    const { name, abilities, weight, moves, sprites } = pokemon;

    return (
        <div className="pokeCard">
            <h2>{name}</h2>
            <img src={sprites.front_default} alt={name} />
            <div>
                <strong>Abilities:</strong>
                <ul>
                    {abilities.map((ability) => (
                        <li key={`${ability.ability.name}-${ability.slot}`}>
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Weight:</strong> {weight}
            </div>
            <div>
                <strong>Number of Moves:</strong> {moves.length}
            </div>
        </div>
    );
}

export default PokeCard;