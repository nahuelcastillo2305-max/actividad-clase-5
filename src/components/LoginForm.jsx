import { useForm } from "react-hook-form";
import { iniciarSesion } from "../services/auth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await iniciarSesion(data.email, data.password);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        {...register("email", {
          required: "El correo es obligatorio",
        })}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password", {
          required: "La contraseña es obligatoria",
        })}
      />

      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginForm;