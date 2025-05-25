import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";
import "./style.css";

function Menu() {
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRol() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Error obteniendo usuario:", userError);
          setRol(null);
          setLoading(false);
          return;
        }

        if (!user) {
          // No hay usuario logueado
          setRol(null);
          setLoading(false);
          return;
        }

        // Consulta el rol del usuario en la tabla 'usuario'
        const { data: rolData, error: rolError } = await supabase
          .from("usuario")
          .select("roll")
          .eq("id", user.id)
          .single();

        if (rolError) {
          console.error("Error obteniendo rol:", rolError);
          setRol(null);
        } else if (rolData) {
          setRol(rolData.roll);
        } else {
          setRol(null);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
        setRol(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRol();
  }, []);

  if (loading) return null; // O algún loader mientras carga el rol

  return (
    <nav className="c-menu">
      <Link to="/">Home</Link>
      <Link to="/lista">Catalogo</Link>
      <Link to="/favorito">Favoritos</Link>
      <Link to="/comparador">Comparador</Link>
      <Link to="/comprados">Comprados</Link>
      <Link to="/usuarios">Usuarios</Link>
      {rol === "admin" && <Link to="/administrador">Panel de Administración</Link>}
    </nav>
  );
}

export default Menu;
