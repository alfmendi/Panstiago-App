import { useEffect } from "react";

import { useSelector } from "react-redux";

import { axiosPrivado } from "../api/axios";

import useRefreshToken from "./useRefreshToken";

// -------------------------------------------------------
// - Hook propio que permite añadir a una petición axios -
// - toda la información del token del cliente           -
// - Basicamente lo que hace es agregar un interceptor   -
// - a la instancia privada de axios                     -
// -------------------------------------------------------
const useAxiosPrivado = () => {
  const refrescarAccessToken = useRefreshToken();
  const { cliente } = useSelector((state) => state.cliente);

  useEffect(() => {
    const requestInterceptor = axiosPrivado.interceptors.request.use(
      (config) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${cliente?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivado.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // Empleo el código 403 porque es el código que genero
        // en autenticacionMiddleware cuando existe un Access Token pero no es válido
        // (se ha rechazado con jwt.verify)
        if (error?.response?.status === 403 && !prevRequest?.enviado) {
          prevRequest.enviado = true;
          const nuevoAccessToken = await refrescarAccessToken();
          prevRequest.headers["authorization"] = `Bearer ${nuevoAccessToken}`;
          return axiosPrivado(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivado.interceptors.request.eject(requestInterceptor);
      axiosPrivado.interceptors.response.eject(responseInterceptor);
    };
  }, [cliente, refrescarAccessToken]);

  return axiosPrivado;
};

export default useAxiosPrivado;
