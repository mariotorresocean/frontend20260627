import { useEffect, useState } from "react"

export default function CharacterList() {
    const [characters, setCharacters] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState(null)

    // Estados de Paginação e Controle
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(null)

    // Estados dos Filtros Operacionais
    const [nameFilter, setNameFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [genderFilter, setGenderFilter] = useState("")

    const generoPtBr = {
        Male: "MASCULINO",
        Female: "FEMININO",
        Genderless: "SEM GÊNERO",
        unknown: "DESCONHECIDO"
    }

    const statusCores = {
        Alive: "#00ff88", // Verde Neon de alta intensidade
        Dead: "#ff3355",  // Vermelho Alerta
        unknown: "#ffb703" // Amarelo Radiação
    }

    function loadMore() {
        setPage((prevPage) => prevPage + 1);
    }

    // Monitora filtros e paginação para atualizar a busca na API
    useEffect(() => {
        // Constrói os parâmetros da URL de forma dinâmica
        const params = new URLSearchParams({
            page: page.toString(),
            ...(nameFilter && { name: nameFilter }),
            ...(statusFilter && { status: statusFilter }),
            ...(genderFilter && { gender: genderFilter })
        });

        fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`)
            .then((response) => {
                if (!response.ok) throw new Error("Setor vazio ou sem registros.");
                return response.json();
            })
            .then((data) => {
                // Se for a página 1, substitui a lista. Se for loadMore, concatena.
                setCharacters((atuais) => page === 1 ? data.results : [...atuais, ...data.results]);
                setTotal(data.info.count);
                setHasNextPage(data.info.next != null);
            })
            .catch((error) => {
                console.error('Erro na varredura:', error);
                if (page === 1) {
                    setCharacters([]);
                    setTotal(0);
                    setHasNextPage(false);
                }
            });
    }, [page, nameFilter, statusFilter, genderFilter]);

    // Reseta para a página 1 quando qualquer filtro muda
    const handleFilterChange = (setter, value) => {
        setter(value);
        setPage(1); 
    };

    return (
        <div style={{
            backgroundColor: '#07090e',
            color: '#e2e8f0', // Texto base alterado para cinza claro de alto contraste
            fontFamily: '"Courier New", Courier, monospace',
            minHeight: '100vh',
            padding: '24px',
            backgroundImage: 'radial-gradient(circle, #0f141c 10%, #07090e 90%)',
            position: 'relative'
        }}>
            
            {/* Estilos Avançados Injetados */}
            <style>{`
                .glitch-card {
                    transition: all 0.25s ease-in-out;
                    cursor: pointer;
                }
                .glitch-card:hover {
                    border-color: #00e5ff !important;
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
                    background: rgba(15, 23, 42, 0.8) !important;
                }
                .cyber-input {
                    background: #111723;
                    border: 1px solid #334155;
                    color: #00ff88;
                    font-family: inherit;
                    padding: 10px;
                    font-size: 0.9rem;
                    outline: none;
                }
                .cyber-input:focus {
                    border-color: #00e5ff;
                    box-shadow: 0 0 8px rgba(0, 229, 255, 0.2);
                }
                .cyber-button {
                    transition: all 0.2s;
                }
                .cyber-button:hover {
                    background-color: #00ff88 !important;
                    color: #000 !important;
                    box-shadow: 0 0 15px #00ff88;
                }
                /* Linhas de scan suavizadas para não prejudicar a leitura */
                .scanlines {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%);
                    background-size: 100% 4px; z-index: 9999; pointer-events: none;
                }
            `}</style>

            <div className="scanlines" />

            {/* Cabeçalho */}
            <header style={{ borderBottom: '2px solid #1e293b', paddingBottom: '16px', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', margin: '0 0 8px 0', color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,0.2)' }}>
                    TERMINAL DE RASTREAMENTO MULTIVERSAL //
                </h1>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    <span>REGISTROS: <span style={{ color: '#00e5ff' }}>{characters.length} / {total}</span></span>
                    <span>SETOR: <span style={{ color: '#00e5ff' }}>PÁGINA_{page}</span></span>
                    <span>LINK_TEMPORAL: <span style={{ color: hasNextPage ? '#00ff88' : '#ff3355' }}>{hasNextPage ? 'ESTÁVEL' : 'FIM_DA_LINHA'}</span></span>
                </div>
            </header>

            {/* Painel de Filtros Avançados */}
            <section style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #1e293b',
                padding: '16px',
                marginBottom: '30px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>[ RASTREAR_POR_NOME ]</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Rick, Morty, Summer..." 
                        className="cyber-input"
                        value={nameFilter}
                        onChange={(e) => handleFilterChange(setNameFilter, e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>[ FILTRAR_STATUS ]</label>
                    <select 
                        className="cyber-input"
                        value={statusFilter}
                        onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
                    >
                        <option value="">TODOS OS STATUS</option>
                        <option value="alive">VIVO (ALIVE)</option>
                        <option value="dead">MORTO (DEAD)</option>
                        <option value="unknown">DESCONHECIDO (UNKNOWN)</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>[ FILTRAR_GÊNERO ]</label>
                    <select 
                        className="cyber-input"
                        value={genderFilter}
                        onChange={(e) => handleFilterChange(setGenderFilter, e.target.value)}
                    >
                        <option value="">TODOS OS GÊNEROS</option>
                        <option value="female">FEMININO</option>
                        <option value="male">MASCULINO</option>
                        <option value="genderless">SEM GÊNERO</option>
                        <option value="unknown">DESCONHECIDO</option>
                    </select>
                </div>
            </section>

            {/* Painel de Detalhes Selecionado (Modal Holográfico) */}
            {selectedCharacter && (
                <div style={{
                    border: '2px dashed #00e5ff',
                    padding: '20px',
                    marginBottom: '30px',
                    background: 'rgba(9, 15, 28, 0.98)',
                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.15)',
                    position: 'relative',
                    clipPath: 'polygon(0 0, 98% 0, 100% 8%, 100% 100%, 2% 100%, 0 92%)'
                }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <img 
                            src={selectedCharacter.image} 
                            alt={selectedCharacter.name}
                            style={{ 
                                width: '130px', 
                                border: `2px solid ${statusCores[selectedCharacter.status] || '#00ff88'}`,
                                boxShadow: `0 0 10px ${statusCores[selectedCharacter.status]}44`
                            }} 
                        />
                        <div style={{ flex: 1 }}>
                            <h2 style={{ color: '#00e5ff', margin: '0 0 12px 0', fontSize: '1.6rem', letterSpacing: '2px' }}>
                                // {selectedCharacter.name.toUpperCase()}
                            </h2>
                            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
                                <strong style={{ color: '#94a3b8' }}>STATUS: </strong> 
                                <span style={{ color: statusCores[selectedCharacter.status], fontWeight: 'bold' }}>
                                    ● {selectedCharacter.status.toUpperCase()}
                                </span>
                            </p>
                            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}><strong style={{ color: '#94a3b8' }}>ESPÉCIE:</strong> {selectedCharacter.species.toUpperCase()}</p>
                            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}><strong style={{ color: '#94a3b8' }}>GÊNERO:</strong> {generoPtBr[selectedCharacter.gender] || 'DESCONHECIDO'}</p>
                            <p style={{ margin: '8px 0', fontSize: '0.95rem' }}><strong style={{ color: '#94a3b8' }}>ORIGEM_DIMENSIONAL:</strong> {selectedCharacter.origin.name.toUpperCase()}</p>
                        </div>
                    </div>
                    <button 
                        className="cyber-button"
                        onClick={() => setSelectedCharacter(null)}
                        style={{
                            position: 'absolute', top: '15px', right: '15px',
                            background: 'transparent', border: '1px solid #ff3355', color: '#ff3355',
                            padding: '6px 14px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold'
                        }}
                    >
                        [ FECHAR ]
                    </button>
                </div>
            )}

            {/* Grid de Cards */}
            {characters.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#ff3355', border: '1px dashed #ff3355', background: 'rgba(255,51,85,0.05)' }}>
                    ⚠️ NENHUMA ANOMALIA OU CLONE DETECTADO COM ESTES PARÂMETROS.
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {characters.map((personagem) => (
                        <div
                            key={personagem.id}
                            className="glitch-card"
                            style={{ 
                                border: '1px solid #1e293b', 
                                padding: '16px', 
                                background: 'rgba(15, 23, 42, 0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                clipPath: 'polygon(0 0, 92% 0, 100% 10%, 100% 100%, 0 100%)'
                            }}
                            onClick={() => setSelectedCharacter(personagem)}
                        >
                            {/* Alerta de Status */}
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                width: '8px', height: '8px', borderRadius: '50%',
                                backgroundColor: statusCores[personagem.status] || '#888',
                                boxShadow: `0 0 8px ${statusCores[personagem.status]}`
                            }} />

                            <img 
                                src={personagem.image} 
                                alt={personagem.name}
                                style={{ 
                                    width: '100px', 
                                    height: '100px',
                                    borderRadius: '4px',
                                    marginBottom: '12px',
                                    border: '1px solid #334155',
                                    filter: 'contrast(110%)' // Removidos filtros pesados que distorciam a legibilidade
                                }} 
                            />

                            <h3 style={{ 
                                fontSize: '0.95rem', 
                                margin: '0', 
                                color: '#f1f5f9', // Nome do personagem em branco/cinza ultra nítido
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                letterSpacing: '0.5px'
                            }}>
                                {personagem.name.toUpperCase()}
                            </h3>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', fontWeight: 'bold' }}>
                                REG: #{personagem.id.toString().padStart(4, '0')}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Paginação */}
            {hasNextPage && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <button 
                        className="cyber-button"
                        onClick={loadMore}
                        style={{
                            background: 'transparent',
                            border: '1px solid #00ff88',
                            color: '#00ff88',
                            padding: '12px 32px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            letterSpacing: '2px',
                            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
                        }}
                    >
                        [ CARREGAR_MAIS_DADOS ]
                    </button>
                </div>
            )}
        </div>
    )
}