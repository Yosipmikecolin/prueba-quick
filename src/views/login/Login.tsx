import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

import { Inputs } from "../../interfaces";
import { SchemaLogin } from "../../schemas";
import { useAlerts, useAuth } from "../../hooks";
import classes from "./Login.module.css";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { setAlert } = useAlerts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SchemaLogin),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.username === "quick" && data.password === "12345") {
      setUser(true);
      localStorage.setItem("user", JSON.stringify(true));
      navigate("/pokemons");
    } else {
      setAlert({
        active: true,
        message: "El usuario o contraseña es incorrecta",
        type: "danger",
      });
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
    </section>
  );
};

export default Login;
