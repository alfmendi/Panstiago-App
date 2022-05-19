import axios from "axios";

const BASE_URL = "http://localhost:5000";

// ----------------------------------------------
// - Método utilizado para realizar la petición -
// - a una ruta pública del servidor            -
// ----------------------------------------------
export default axios.create({
  baseURL: BASE_URL,
});

// ------------------------------------------------
// - Método utilizado para realizar la petición   -
// - a una ruta privada del servidor              -
// - El parámetro withCredentials se utiliza      -
// - para enviar el cookie en el que se encuentra -
// - el refresh token                             -
// ------------------------------------------------
export const axiosPrivado = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
