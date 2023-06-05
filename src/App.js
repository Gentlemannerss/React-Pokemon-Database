import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import PokeLogo from './assets/International_Pokémon_logo.svg.png';
import PokeCard from './components/PokeCard';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
                );
                setPokemonList(response.data.results);
                setDisablePrev(offset === 0);
                setDisableNext(response.data.next === null);
            } catch (error) {
                setError(error.message);
            }

            setIsLoading(false);
        };

        fetchPokemonList();
    }, [offset]);

    const handlePrevClick = () => {
        setOffset(offset - 20);
    };

    const handleNextClick = () => {
        setOffset(offset + 20);
    };

    return (
        <>
            <header className="outerContainer">
                <div className="innerContainer">
                    <img src={PokeLogo} alt="Pokemon Logo"/>
                </div>
            </header>
            <div className="outerContainer">
                <div className="buttonContainer">
                    <button onClick={handlePrevClick} disabled={disablePrev}>
                        Previous
                    </button>
                    <button onClick={handleNextClick} disabled={disableNext}>
                        Next
                    </button>
                </div>
            </div>
            <div className="listOfTwenty">
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    pokemonList.map((pokemon) => (
                        <PokeCard key={pokemon.name} pokemonName={pokemon.name} />
                    ))
                )}
            </div>
        </>
    );
}

export default App;