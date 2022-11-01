import { useEffect, useState } from "react";
import api from "../../service/api"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import "./home.css";

function Home() {
    const [filmes, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const PATH = "/movie/now_playing"

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get(PATH, {
                params: {
                    api_key: "fee237027cda2226413246654a5143ef",
                    language: "pt-BR",
                    page: 1,
                }
            });

            //  console.log(response.data.results);
            setFilme(response.data.results);
            setLoading(false);
        }

        loadFilmes();

    }, [])

    if (loading) {
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

    return (
        <div>
            {filmes.map((filme: any) => {
                return (
                    <Container fluid>
                        <div className="lista-filmes">
                            <Row >
                                <Col>
                                    <article>
                                        <strong> {filme.title} </strong>
                                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                        <Button href={`filme/${filme.id}`}>Acessar</Button>
                                    </article>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                )
            })}
        </div>
    );
}

export default Home;