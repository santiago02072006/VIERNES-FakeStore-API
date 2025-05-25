import { useNavigate } from "react-router-dom";
import './style.css';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      <div className="inicio-contenido">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Descubre los mejores productos a los mejores precios.</p>
        <button onClick={() => navigate("/lista")}>
          Explorar productos
        </button>
      </div>
    </div>
  );
}
