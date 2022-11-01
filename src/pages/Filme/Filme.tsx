import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import api from "../../service/api"
import {toast} from "react-toastify";
import "./filme.css"

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilmes]: any = useState({});
    const [load, setLoading] = useState(true);
    let favorito = "Salvar";

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "fee237027cda2226413246654a5143ef",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilmes(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("filme não encontrado");
                    navigate("/", { replace: true })
                    return;
                })
        }

        loadFilmes();

        return () => {
            console.log("componente desmontado");
        }

    }, [navigate, id])

    function salvarFilme() {
        const minhaLista: any = localStorage.getItem("@primeflix");
        let filmesSalvos: any = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvos: { id: any; }) => filmesSalvos.id === filme.id);

        if (hasFilme) {
            toast.warning("Filme Já está na lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filve salvo com sucesso!");

    }

    function verificarFavorito() {

        const hasFilmeSave: any = localStorage.getItem("@primeflix");
        let filmesSalvos: any = JSON.parse(hasFilmeSave) || [];
        const hasFilme = filmesSalvos.some((filmesSalvos: { id: any; }) => filmesSalvos.id === filme.id);

        if (hasFilme) {
            return favorito = "Remover";
        }

    }

    if (load) {
        return (
            <div className="loading">
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>

            </div>
        )
    }

    verificarFavorito();
    
    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-button">
                <Button onClick={salvarFilme}>{favorito}</Button>
                <Button target="blank" href={`https://www.youtube.com/results?search_query=${filme.title}`}>Trailer</Button>
            </div>

        </div>


    );
}

export default Filme;