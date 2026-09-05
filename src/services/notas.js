import { supabase } from "../supabaseClient";

export async function crearNota(contenido) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("USUARIO AUTENTICADO:", user?.id);
  console.log("ERROR USUARIO:", userError);

  if (!user) {
    throw new Error("No hay un usuario autenticado");
  }

  const { error } = await supabase
    .from("notas")
    .insert({
      contenido: contenido,
    });

  if (error) {
    console.error("ERROR INSERTANDO NOTA:", error);
    throw error;
  }

  return true;
}

export async function obtenerNotas() {
  const { data, error } = await supabase
    .from("notas")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function actualizarNota(id, contenido) {
  const { error } = await supabase
    .from("notas")
    .update({
      contenido: contenido,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}

export async function eliminarNota(id) {
  const { error } = await supabase
    .from("notas")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}