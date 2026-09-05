import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaPrivada({ children }) {
  const { sesion, cargando } = useAuth();

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivada;