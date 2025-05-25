import { useState } from 'react'
import { supabase } from '../../supabase' // Ajusta la ruta según tu proyecto
import { useNavigate } from 'react-router-dom'
import './style.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert("Usuario o contraseña no válidos")
      return
    }

    const user = data.user
    if (!user) {
      alert("Error al obtener información del usuario")
      return
    }

    // Consultar el rol del usuario
    const { data: userData, error: userError } = await supabase
      .from("usuario")
      .select("roll")
      .eq("id", user.id)
      .single()

    if (userError || !userData) {
      alert("Error al verificar el rol del usuario")
      return
    }

    if (userData.roll === "admin") {
      navigate("/administrador")
    } else {
      navigate("/")
    }
  }

    return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          Iniciar sesión
        </button>
      </form>
      <div className="register-section">
        <p>¿No tienes cuenta?</p>
        <button onClick={() => navigate("/registro")}>
          Regístrate
        </button>
      </div>
    </div>
  )
}


export default Login