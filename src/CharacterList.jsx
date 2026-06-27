import { useEffect, useState } from "react"

export default function CharacterList() {
    const [characters, setCharacters] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState()

    const generoPtBr = {
        Male: "Masculino",
        Female: "Feminino",
        Genderless:"Sem gênero",
        unknown: "Desconhecido"
    }

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((data) => setCharacters(data.results))
        .catch((error) => console.error('Erro!!! Detalhes:', error))
    }, []);

    return (
        <div>
            {selectedCharacter && (
                <div style={{ border: '2px solid #22c55e', padding: '16px', marginBottom: '20px', background:'#e8f5e9'}}>
                    <h2>{selectedCharacter.name}</h2>
                    <p><strong>Status:</strong> {selectedCharacter.status}</p>
                    <p><strong>Espécie:</strong> {selectedCharacter.species}</p>
                    <p><strong>Genero:</strong> {generoPtBr[selectedCharacter.gender]}</p>
                    <p><strong>Origem:</strong> {selectedCharacter.origin.name}</p>
                    <button onClick={() => setSelectedCharacter(null)}>Fechar</button>
                </div>
            )}
            <h1>Lista de personagens</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap:'16px'}}>
                {characters.map((personagem) => (
                    <div style={{ border: '1px solid #ccc', padding: '16px', background:'#fff'}}
                        onClick={()=>setSelectedCharacter(personagem)}
                    >
                        <h3>{personagem.name}</h3>
                        <img src={personagem.image} style={{width:'100px', borderRadius:'15px'}} />
                    </div>
                ))}
            </div>
        </div>
    )
}