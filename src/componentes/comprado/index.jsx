import { useContext } from "react";
import { AppContext } from "../../contexto/contexto";
import "./style.css";

function Comprados() {
  const { comprados } = useContext(AppContext);

  return (
    <div className="comprados-container">
      <h2>Productos comprados</h2>
      {comprados.length === 0 ? (
        <p className="no-products">No has comprado productos todavía.</p>
      ) : (
        <ul className="comprados-list">
          {comprados.map((producto, index) => (
            <li key={index}>
              <strong>{producto.title}</strong> - ${producto.price}<br />
              Comprado por: {producto.nombre}<br />
              Dirección: {producto.direccion}<br />
              Fecha: {producto.fecha}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Comprados;
