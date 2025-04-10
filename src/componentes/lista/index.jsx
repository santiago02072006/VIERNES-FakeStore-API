import { useEffect, useState } from 'react';

function Lista() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(responseData => setData(responseData))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <section className='c-lista'>
      {data.map((producto) => (
        <div className='c-lista-producto' key={producto.id}>
          <img 
            src={producto.image}
            alt={producto.title}
            width='auto'
            height='60'
            loading='lazy'
          />
          <p>{producto.title}</p>
          <p>${producto.price}</p>
        </div>
      ))}
    </section>
  );
}

export default Lista;
