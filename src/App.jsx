import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import RutaPrivada from "./components/RutaPrivada";
import Notas from "./components/Notas";
import { cerrarSesion } from "./services/auth";
import { useAuth } from "./context/AuthContext";

function Inicio() {
  return (
    <div>
      <h1>Actividad Clase 5</h1>
      <p>Bienvenido al sistema.</p>
    </div>
  );
}

function Comisiones() {
  const { sesion } = useAuth();

  return (
    <div>
      <h1>Comisiones</h1>

      <p>
        Usuario conectado: <strong>{sesion?.user?.email}</strong>
      </p>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/registro">Registro</Link> |{" "}
        <Link to="/comisiones">Comisiones</Link> |{" "}
        <Link to="/notas">Notas</Link>
      </nav>

      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={<Inicio />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* Registro */}
        <Route
          path="/registro"
          element={<RegisterForm />}
        />

        {/* Ruta protegida de Comisiones */}
        <Route
          path="/comisiones"
          element={
            <RutaPrivada>
              <Comisiones />
            </RutaPrivada>
          }
        />

        {/* Ruta protegida de Notas */}
        <Route
          path="/notas"
          element={
            <RutaPrivada>
              <Notas />
            </RutaPrivada>
          }
        />
      </Routes>
    </>
  );
}

export default App;