# Actividad Clase 5 - Desarrollo Web

Proyecto realizado con React, Vite y Supabase, incluyendo login, registro, rutas protegidas y CRUD de notas.

## Política RLS de notas

Cada usuario puede consultar únicamente sus propias notas mediante `auth.uid() = user_id`.
La política de inserción verifica que `user_id` corresponda al usuario autenticado.
De esta manera, un usuario no puede acceder ni modificar las notas pertenecientes a otros usuarios.

Aplicación desplegada en Vercel:

https://actividad-clase-5.vercel.app