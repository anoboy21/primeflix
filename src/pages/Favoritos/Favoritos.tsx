import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import './favoritos.css'


function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const listFavoritos: any = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(listFavoritos) || []);

    }, [])

    function excluirFilme(id: any) {
        let filtroFimes = filmes.filter((filme: any) => {
            return (filme.id !== id);
        })
        setFilmes(filtroFimes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFimes));
        toast.success("Filme removido com sucesso!");
    }

    return (

        <div className="meus-filmes">
            <h1>Meus Favoritos</h1>
            {filmes.length === 0 && <span>Você não possui favoritos!</span>}
            <ul>
                {filmes.map((filme: any) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>

                            <div>
                                <Button><Link to={`/filme/${filme.id}`}>Ver Detalhes</Link></Button>
                                <Button onClick={() => excluirFilme(filme.id)}>Remover</Button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;