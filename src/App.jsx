import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabase"; // Asegúrate de tener este archivo configurado
import { AppProvider } from "./contexto/contexto";

// Componentes principales
import Menu from "./componentes/menu";
import Lista from "./componentes/lista";
import Usuarios from "./componentes/usuarios";
import Comparador from "./componentes/comparador";

import Favoritos from "./componentes/favorito";
import Producto from "./componentes/producto"; // Reemplazado aquí
import Login from "./componentes/login"; // Asegúrate de que exista este componente
import Administrador from "./componentes/administrador";
import Registro from "./componentes/registro";
import Comprado from "./componentes/comprado";
import Inicio from "./componentes/inicio";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe(); // Limpieza del listener
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}

        <Routes>

          <Route path="/" element={usuario ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/lista" element={usuario ? <Lista /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
          <Route path="/comparador" element={usuario ? <Comparador /> : <Navigate to="/login" />} />
          <Route path="/comprados" element={usuario ? <Comprado /> : <Navigate to="/login" />} />
          <Route path="/favorito" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/producto/:id" element={usuario ? <Producto /> : <Navigate to="/login" />} /> {/* Aquí se cambió */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/administrador" element={<Administrador />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
