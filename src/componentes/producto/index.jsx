import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Producto() {
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const [favoritos, setFavoritos] = useState([]);

  const esFavorito = favoritos.some(p => p.id === products?.id);

  useEffect(() => {
    console.log("ID desde params:", id); // <-- esto
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error al obtener producto:", error));
  }, [id]);
  

  const toggleFavorito = () => {
    if (!products) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== products.id));
    } else {
      setFavoritos([...favoritos, { id: products.id, titulo: products.title }]);
    }
  };

  if (!products) return <p>Cargando...</p>;


  return (
    <div className="producto">
      <img src={products.image} alt={products.title} width="200" />
      <h2>{products.title}</h2>
      <p>{products.description}</p>
      <p><strong>Precio:</strong> ${products.price}</p>
      <p><strong>Categoría:</strong> {products.category}</p>
      <p><strong>Rating:</strong> ⭐ {products.rating?.rate} ({products.rating?.count} reseñas)</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </div>
  );
}

export default Producto;
