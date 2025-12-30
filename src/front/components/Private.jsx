import { useEffect, useState } from "react";
import api from "../services/api";

function Private() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const load = async () => {
      try {
        const data = await api.getPrivate();
        setMsg(data.msg);
      } catch {
        window.location.href = "/login";
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1>Privado</h1>
      <p>{msg}</p>
    </div>
  );
}

export default Private;
