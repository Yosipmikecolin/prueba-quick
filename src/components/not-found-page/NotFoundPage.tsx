import { useNavigate } from "react-router";

//@ts-ignore
import ImageNotFound from "/public/images/not-found.png";
//@ts-ignore
import IconLeft from "/public/images/icon-left.png";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className={classes["container-not-found-page"]}>
      <div className={classes["container-not-found-elements"]}>
        <img src={ImageNotFound} className={classes.image} />
        <div className={classes.box}>
          <h1>Oops!</h1>
          <p>Esta página no existe</p>

          <button onClick={() => navigate("/")}>
            <img src={IconLeft} width={30} height={30} /> Volver
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
