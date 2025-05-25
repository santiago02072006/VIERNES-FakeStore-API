import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

import './style.css';

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="c-favoritos-container">
          {favoritos.map((product) => (
            <div 
              className="c-favorito-card" 
              key={product.id}
              onClick={() => navigate(`/producto/${product.id}`)}
            >
              <img 
                src={product.image} 
                alt={product.title || "Product"} 
              />
              <h3>{product.title}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
