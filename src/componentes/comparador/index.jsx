import { useContext, useState } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Comparador() {
  const { data } = useContext(AppContext);
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();

  const toggleSeleccion = (producto) => {
    const existe = seleccionados.find(p => p.id === producto.id);

    if (existe) {
      setSeleccionados(prev => prev.filter(p => p.id !== producto.id));
    } else if (seleccionados.length < 2) {
      setSeleccionados(prev => [...prev, producto]);
    } else {
      alert("Solo puedes comparar 2 productos a la vez.");
    }
  };

  const calcularDiferencia = () => {
    if (seleccionados.length === 2) {
      const [p1, p2] = seleccionados;
      const diferencia = Math.abs(p1.price - p2.price).toFixed(2);
      return `Diferencia de precio: $${diferencia}`;
    }
    return null;
  };

  return (
    <div className="comparador">
      <h2>Comparador de Productos</h2>

      <div className="comparador-selector">
        {data.map(producto => (
          <label key={producto.id} className="comparador-item">
            <input
              type="checkbox"
              checked={seleccionados.some(p => p.id === producto.id)}
              onChange={() => toggleSeleccion(producto)}
            />
            {producto.title}
          </label>
        ))}
      </div>

      {seleccionados.length > 0 && (
        <div className="comparador-tabla">
          {seleccionados.map((p, index) => (
            <div key={p.id} className="comparador-card">
              <img src={p.image} alt={p.title} />
              <h3>{p.title}</h3>
              <p><strong>Precio:</strong> ${p.price}</p>
              <p><strong>Categoría:</strong> {p.category}</p>
              <p><strong>Rating:</strong> ⭐ {p.rating?.rate}</p>
              <button onClick={() => navigate(`/producto/${p.id}`)}>Ver más</button>
            </div>
          ))}
        </div>
      )}

      {seleccionados.length === 2 && (
        <div className="comparador-diferencia">
          <p>{calcularDiferencia()}</p>
        </div>
      )}
    </div>
  );
}

export default Comparador;
