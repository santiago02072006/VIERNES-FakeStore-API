import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtro from '../filtro';
import './style.css';

function Listas() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('All');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const url = categoriaSeleccionada === 'All'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${encodeURIComponent(categoriaSeleccionada)}`;

        const res = await fetch(url);
        const productos = await res.json();
        setData(productos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, [categoriaSeleccionada]);

  const handleCategoriaChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  let resultados = data;

  if (busqueda.length >= 3) {
    resultados = data.filter(products =>
      products.title.toLowerCase().includes(busqueda.toLowerCase())
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

      <Filtro onCategoriaChange={handleCategoriaChange} />

      <section className='c-lista'>
        {resultados.map((products) => (
          <div
            className='c-lista-producto'
            key={products.id}
            onClick={() => navigate(`/producto/${products.id}`)}
          >
            <p>ID: {products.id}</p>
            <img
              src={products.image}
              alt={products.title}
              width='auto'
              height='100'
              loading='lazy'
            />
            <p>{products.title}</p>
            <p>${products.price}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;
