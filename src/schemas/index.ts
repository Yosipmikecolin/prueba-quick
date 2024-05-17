import * as yup from "yup";

export const SchemaLogin = yup
  .object({
    username: yup.string().required("Campo requerido"),
    password: yup.string().required("Campo requerido"),
  })
  .required();
