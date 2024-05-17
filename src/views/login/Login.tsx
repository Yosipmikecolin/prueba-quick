import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import classes from "./Login.module.css";
import { Inputs } from "../../interfaces";
import toast, { Toaster } from "react-hot-toast";
import { SchemaLogin } from "../../schemas";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SchemaLogin),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.username === "quick" && data.password === "12345") {
    } else {
      toast.error("El usuario o contraseña es incorrecta");
    }
  };

  return (
    <section className={classes["container-login"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes["form-login"]}>
        <h2>Accede a tu cuenta</h2>
        <div className={classes["container-input"]}>
          <input placeholder="Usuario" type="text" {...register("username")} />
          <p className={classes["text-error"]}>{errors.username?.message}</p>
        </div>
        <div className={classes["container-input"]}>
          <input
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
          <p className={classes["text-error"]}>{errors.password?.message}</p>
        </div>

        <button className={classes["button-form"]}>Iniciar sesión</button>
      </form>
      <Toaster />
    </section>
  );
};

export default Login;
