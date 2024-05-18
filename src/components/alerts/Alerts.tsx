import { useEffect } from "react";
import { useAlerts } from "../../hooks";
import IconSuccess from "/images/icon-success.png";
import IconWarning from "/images/icon-warning.png";
import IconError from "/images/icon-error.png";
import classes from "./Alerts.module.css";

const Alerts = () => {
  const { alert, setAlert } = useAlerts();

  useEffect(() => {
    if (alert.active) {
      const timer1 = setTimeout(() => {
        setAlert({ active: false, message: "" });
      }, 4000);

      return () => clearTimeout(timer1);
    }
  }, [alert.active, setAlert]);

  const typeMessage = (type?: string) => {
    switch (type) {
      case "success":
        return IconSuccess;

      case "warning":
        return IconWarning;

      case "danger":
        return IconError;

      default:
        return IconSuccess;
    }
  };

  return (
    <div
      className={
        alert.active ? classes["toast-active"] : classes["toast-disabled"]
      }
    >
      {alert.active && (
        <img
          src={typeMessage(alert.type)}
          width={20}
          height={20}
          alt="icon-toast"
        />
      )}

      {alert.message}
    </div>
  );
};

export default Alerts;
