import { useDispatch } from "react-redux";

import axios from "../api/axios";

import { establecerCliente } from "../redux/clienteSlice";

// ---------------------------------------------
// - Hook que permite utilizar el refreshToken -
// - para obtener un nuevo accessToken         -
// ---------------------------------------------
const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refrescarAccessToken = async () => {
    try {
      const respuesta = await axios.get("/api/tokens/refrescarAccessToken", {
        withCredentials: true,
      });
      dispatch(establecerCliente(respuesta.data));
      // Devuelve un access Token
      return respuesta.data.accessToken;
    } catch (error) {
      // console.log("Error en useRefreshToken...");
    }
  };

  return refrescarAccessToken;
};

export default useRefreshToken;
