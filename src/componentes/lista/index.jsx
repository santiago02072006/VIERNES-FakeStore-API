import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import Filtro from '../filtro';
import './style.css';

function Lista() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const {
    data,
    categoriaSeleccionada,
    setCategoriaSeleccionada
  } = useContext(AppContext);

  const handleCategoriaChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  let resultados = data;

  // Filtro por título
  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(product =>
      product.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Filtro por ID numérico
  if (!isNaN(busqueda) && busqueda !== '') {
    resultados = data.filter(product =>
      product.id.toString() === busqueda
    );
  }

  // Filtro por categoría (si no es "All")
  if (categoriaSeleccionada && categoriaSeleccionada !== 'All') {
    resultados = resultados.filter(product =>
      product.category === categoriaSeleccionada
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {/* ✅ Aquí pasamos la categoría seleccionada */}
      <Filtro 
        onCategoriaChange={handleCategoriaChange}
        categoriaSeleccionada={categoriaSeleccionada}
      />

      <section className='c-lista'>
        {resultados.map(product => (
          <div
            className='c-lista-pokemon'
            key={product.id}
            onClick={() => navigate(`/producto/${product.id}`)}
          >
            <p>ID: {product.id}</p>
            <img
              src={product.image}
              alt={product.title}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p>{product.title}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
