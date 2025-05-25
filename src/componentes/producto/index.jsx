import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../contexto/contexto";
import "./style.css";

function Producto() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [datosCompra, setDatosCompra] = useState({ nombre: "", direccion: "" });
  const { favoritos, setFavoritos, comprados, setComprados } = useContext(AppContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then(setProduct)
      .catch((error) => console.error("Error al obtener producto:", error));
  }, [id]);

  const esFavorito = favoritos.some((p) => p.id === product?.id);

  const toggleFavorito = () => {
    if (!product) return;
    if (esFavorito) {
      setFavoritos((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setFavoritos((prev) => [...prev, product]);
    }
  };

  const handleComprar = () => setMostrarFormulario(true);

  const confirmarCompra = () => {
    const compraConDatos = {
      ...product,
      ...datosCompra,
      fecha: new Date().toLocaleString(),
    };
    setComprados((prev) => [...prev, compraConDatos]);
    setMostrarFormulario(false);
    alert("Compra realizada con éxito!");
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="producto">
      <img src={product.image} alt={product.title} width="200" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Rating:</strong> ⭐ {product.rating?.rate} ({product.rating?.count} reseñas)</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>

      <button onClick={handleComprar} style={{ marginLeft: '10px' }}>🛒 Comprar</button>

      {mostrarFormulario && (
        <div style={{ marginTop: '20px' }}>
          <h3>Detalles de la compra</h3>
          <input
            type="text"
            placeholder="Tu nombre"
            value={datosCompra.nombre}
            onChange={(e) => setDatosCompra({ ...datosCompra, nombre: e.target.value })}
          /><br />
          <input
            type="text"
            placeholder="Dirección de envío"
            value={datosCompra.direccion}
            onChange={(e) => setDatosCompra({ ...datosCompra, direccion: e.target.value })}
          /><br />
          <button onClick={confirmarCompra}>Confirmar Compra</button>
        </div>
      )}
    </div>
  );
}

export default Producto;