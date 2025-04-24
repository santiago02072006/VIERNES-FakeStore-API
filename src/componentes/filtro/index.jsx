function Filtro({ onCategoriaChange }) {
    const categoria = [
      "All",
        "men's clothing","jewelery","electronics","women's clothing"
    ];
  
    return (
      <div className="c-filtro">
        {categoria.map((unaCategoria, index) => (
          <button className='' key={index} onClick={() => onCategoriaChange(unaCategoria)}>
            {unaCategoria}
          </button> 
        ))}
      </div>
    );
  }
  
  export default Filtro;