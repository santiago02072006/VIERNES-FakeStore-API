import { createContext, useState, useEffect } from "react";

// Crear el contexto global
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    const local = localStorage.getItem("favoritos");
    return local ? JSON.parse(local) : [];
  });

  const [comprados, setComprados] = useState(() => {
    const local = localStorage.getItem("comprados");
    return local ? JSON.parse(local) : [];
  });

  const [usuarioActual, setUsuarioActual] = useState(null);
  const [aleatorios, setAleatorios] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("All"); // ✅ Añadido

  // Cargar productos desde fakestore API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Guardar comprados en localStorage
  useEffect(() => {
    localStorage.setItem("comprados", JSON.stringify(comprados));
  }, [comprados]);

  return (
    <AppContext.Provider
      value={{
        data,
        favoritos,
        setFavoritos,
        comprados,
        setComprados,
        usuarioActual,
        setUsuarioActual,
        categoriaSeleccionada, // ✅ Añadido al contexto
        setCategoriaSeleccionada, // ✅ Añadido al contexto
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
