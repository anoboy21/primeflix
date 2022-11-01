import { Link } from "react-router-dom";
import "./error.css";

function Error() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Página Não Encontrada</h2>
            <strong>:(</strong>
            <Link to="/">Voltar para Home</Link>
        </div>
    )
}

export default Error;