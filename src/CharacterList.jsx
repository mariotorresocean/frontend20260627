import { useEffect, useState } from "react"

export default function CharacterList() {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((data) => setCharacters(data.results))
        .catch((error) => console.error('Erro!!! Detalhes:', error))
    }, []);

    return (
        <div>
            <h1>Lista de personagens</h1>
            <ul>
                {characters.map((personagem) => (
                    <li>{personagem.name}</li>
                ))}
            </ul>
        </div>
    )
}