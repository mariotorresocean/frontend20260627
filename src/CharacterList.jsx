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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill minmax(200px,1fr))', gap:'16px'}}>
                {characters.map((personagem) => (
                    <div style={{ border: '1px solid #ccc', padding: '16px', background:'#fff'}}>
                        <h3>{personagem.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}