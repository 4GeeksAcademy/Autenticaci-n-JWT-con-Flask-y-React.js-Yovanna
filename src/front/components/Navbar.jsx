function Navbar() {
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav>
      <a href="/signup">Signup</a>
      <a href="/login">Login</a>
      <a href="/private">Private</a>
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
  );
}

export default Navbar;
