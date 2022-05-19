import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

// ------------------------------------------------------------
// ------------------------------------------------------------
// - Componente que permite mostrar los contenidos protegidos -
// - cuando el empleado se ha logeado correctamente           -
// ------------------------------------------------------------
// ------------------------------------------------------------
const ContenidoProtegido = () => {
  const { cliente } = useSelector((state) => state.cliente);

  // -------
  // - JSX -
  // -------
  return !cliente ? <Navigate to="/login" /> : <Outlet />;
};

export default ContenidoProtegido;
