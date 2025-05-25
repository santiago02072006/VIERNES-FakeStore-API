import { useEffect, useState, useContext } from "react";
import { supabase } from "../../supabase";
import { AppContext } from "../../contexto/contexto";
import "./style.css";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
  });
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const { setUsuario: setGlobalUser, setTareas } = useContext(AppContext);

  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error obteniendo usuario:", userError);
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error al obtener datos del perfil:", error);
        } else {
          setUsuario(data);
          setForm(data);
          fetchImagenes(user.id);
        }
      }
    }

    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data, error } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);

    if (error) {
      console.error("Error al obtener imágenes:", error);
    } else {
      setImagenes(data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);

    if (error) {
      alert("Error al actualizar datos");
      console.error(error);
    } else {
      alert("Datos actualizados con éxito");
    }
  };

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;

    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);

    if (error) {
      alert("Error al agregar la imagen");
      console.error(error);
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error al eliminar la imagen");
      console.error(error);
    } else {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (setGlobalUser) setGlobalUser(null);
    if (setTareas) setTareas([]);
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="usuario-container">
      <h2>Perfil de Usuario</h2>

      <label>Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label>

      <label>Correo:
        <input name="correo" value={form.correo} onChange={handleChange} />
      </label>

      <label>Fecha de nacimiento:
        <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
      </label>

      <label>Teléfono:
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </label>

      <label>Rol:
        <input name="roll" value={form.roll} onChange={handleChange} />
      </label>

      <button onClick={handleUpdate}>Guardar cambios</button>

      <hr />

      <h3>Agregar imagen</h3>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={nuevaUrl}
        onChange={(e) => setNuevaUrl(e.target.value)}
      />
      <button onClick={handleAgregarUrl}>Agregar</button>

      <h3>Imágenes guardadas</h3>
      <ul>
        {imagenes.map((img) => (
          <li key={img.id}>
            <img src={img.url} alt="Imagen" />
            <button onClick={() => handleEliminarImagen(img.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <hr />

      <div className="logout-section">
        <h2>Quiero cerrar sesión</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <br /><br /><br /><br /><br />
    </div>
  );
}
