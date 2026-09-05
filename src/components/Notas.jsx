import { useEffect, useState } from "react";
import {
  crearNota,
  obtenerNotas,
  actualizarNota,
  eliminarNota,
} from "../services/notas";

function Notas() {
  const [contenido, setContenido] = useState("");
  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Guarda el ID de la nota que estamos editando
  const [notaEditando, setNotaEditando] = useState(null);

  const cargarNotas = async () => {
    try {
      const datos = await obtenerNotas();
      setNotas(datos);
    } catch (error) {
      console.error("Error al cargar notas:", error);
      alert(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, []);

  // Crear una nueva nota
  const guardarNota = async (e) => {
    e.preventDefault();

    if (!contenido.trim()) {
      return;
    }

    try {
      await crearNota(contenido);
      setContenido("");
      await cargarNotas();
    } catch (error) {
      console.error("Error al guardar nota:", error);
      alert(error.message);
    }
  };

  // Comenzar a editar una nota
  const comenzarEdicion = (nota) => {
    setNotaEditando(nota.id);
    setContenido(nota.contenido);
  };

  // Actualizar una nota
  const guardarEdicion = async (e) => {
    e.preventDefault();

    if (!contenido.trim()) {
      return;
    }

    try {
      await actualizarNota(notaEditando, contenido);

      setContenido("");
      setNotaEditando(null);

      await cargarNotas();
    } catch (error) {
      console.error("Error al actualizar nota:", error);
      alert(error.message);
    }
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setContenido("");
    setNotaEditando(null);
  };

  // Eliminar una nota
  const borrarNota = async (id) => {
    try {
      await eliminarNota(id);
      await cargarNotas();
    } catch (error) {
      console.error("Error al eliminar nota:", error);
      alert(error.message);
    }
  };

  if (cargando) {
    return <p>Cargando notas...</p>;
  }

  return (
    <div>
      <h1>Mis notas</h1>

      <form
        onSubmit={notaEditando ? guardarEdicion : guardarNota}
      >
        <input
          type="text"
          placeholder={
            notaEditando
              ? "Editar nota"
              : "Escribí una nota"
          }
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button type="submit">
          {notaEditando
            ? "Guardar cambios"
            : "Guardar nota"}
        </button>

        {notaEditando && (
          <button
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      {notas.length === 0 ? (
        <p>No tenés notas todavía.</p>
      ) : (
        notas.map((nota) => (
          <div key={nota.id}>
            <p>{nota.contenido}</p>

            <button onClick={() => comenzarEdicion(nota)}>
              Editar
            </button>

            <button onClick={() => borrarNota(nota.id)}>
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Notas;