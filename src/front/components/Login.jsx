import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.login(email, password);
      sessionStorage.setItem("token", data.token);
      window.location.href = "/private";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Inicio de sesión</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Entrar</button>
      </form>
      {error}
    </div>
  );
}

export default Login;
