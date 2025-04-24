import "./style.css"
import { Link } from "react-router-dom"

function Menu() {
    return (
        <>
            <nav className="c-menu">
                <Link to="/">Home</Link>
                <Link to="/favorito">Favoritos</Link>
                <Link to="/aleatorio">Aleatorios</Link>
                <Link to="/comparador">Comparador</Link>
                <Link to="/comprados">Comprados</Link>
                <Link to="/producto">Productos</Link>
                <Link to="/usuarios">Usuarios</Link>
            </nav>
        </>
    )
}

export default Menu