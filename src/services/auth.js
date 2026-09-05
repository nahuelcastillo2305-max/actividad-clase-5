import { supabase } from "../supabaseClient";

export async function iniciarSesion(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function registrarse(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}