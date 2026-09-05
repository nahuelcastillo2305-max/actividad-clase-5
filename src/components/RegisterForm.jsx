import { useForm } from "react-hook-form";
import { registrarse } from "../services/auth";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registrarse(data.email, data.password);
      alert("Usuario registrado correctamente");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear cuenta</h2>

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
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        })}
      />

      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("confirmar", {
          required: "Debés confirmar la contraseña",
          validate: (value) =>
            value === password || "Las contraseñas no coinciden",
        })}
      />

      {errors.confirmar && <p>{errors.confirmar.message}</p>}

      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;