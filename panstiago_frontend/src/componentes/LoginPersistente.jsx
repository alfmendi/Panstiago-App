import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";

import Spinner from "./Spinner/Spinner";

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// - Componente que permite mantener la información del empleado -
// - cuando se realiza un refresh de la página (F5)              -
// ---------------------------------------------------------------
// ---------------------------------------------------------------
const LoginPersistente = () => {
  const { cliente } = useSelector((state) => state.cliente);
  const [estaCargando, setEstaCargando] = useState(true);
  const refrescarAccessToken = useRefreshToken();

  // -------------------------------------------------------------------------------
  // - UseEffect que emplea el hook useRefreshToken para refrescar el access token -
  // -------------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    // Comprueba si existe un refreshToken. Para ello
    // se usa el hook useRefreshToken. Si existe, devuelve un nuevo accessToken
    const utilizarRefreshToken = async () => {
      try {
        await refrescarAccessToken();
      } catch (error) {
        // console.log("Error en el componente LoginPersistente...");
      } finally {
        isMounted && setEstaCargando(false);
      }
    };
    !cliente?.accessToken ? utilizarRefreshToken() : setEstaCargando(false);

    return () => (isMounted = false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // -------
  // - JSX -
  // -------
  return <>{estaCargando ? <Spinner /> : <Outlet />}</>;
};

export default LoginPersistente;
