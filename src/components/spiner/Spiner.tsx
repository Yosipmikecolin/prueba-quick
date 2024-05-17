import classes from "./Spiner.module.css";

const Spiner = () => {
  return (
    <section className={classes["container-sniper"]}>
      <div className={classes.loader} />
    </section>
  );
};

export default Spiner;
