import './style.css' 


function Filtro({ onCategoriaChange, categoriaSeleccionada }) {
  const categorias = [
    "All",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing"
  ];

  return (
    <div className="c-filtro">
      {categorias.map((unaCategoria, index) => (
        <button
          key={index}
          className={categoriaSeleccionada === unaCategoria ? 'activo' : ''}
          onClick={() => onCategoriaChange(unaCategoria)}
        >
          {unaCategoria}
        </button>
      ))}
    </div>
  );
}


  
  
  export default Filtro;