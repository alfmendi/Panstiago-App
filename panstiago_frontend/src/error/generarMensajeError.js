import errorToast from "./errorToast";

// -------------------------------------------------------------
// - Método que gestiona los errores devueltos por el servidor -
// -------------------------------------------------------------
const generarMensajeError = (error, posicion = "top-center") => {
  let mensajeError = "";
  if (error?.message.includes("Los passwords no coinciden")) {
    mensajeError = error.message;
  } else if (!error.response.data) {
    mensajeError = "No hay respuesta del servidor";
  } else {
    mensajeError = error.response.data.mensaje;
    if (Array.isArray(mensajeError)) {
      mensajeError = mensajeError.join("\n");
    }
  }

  // if (!error?.response) {
  //   mensajeError = "No hay respuesta del servidor";
  // } else if (error.response?.status === 400) {
  //   mensajeError = "Missing email or password";
  // } else if (error.response?.status === 401) {
  //   mensajeError = "Unauthorized";
  // } else {
  //   mensajeError = "Login failed";
  // }

  return errorToast(mensajeError, posicion);
};

export default generarMensajeError;
