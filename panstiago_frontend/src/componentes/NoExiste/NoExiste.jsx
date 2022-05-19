import { useNavigate } from "react-router-dom";

import "./noExiste.css";

// --------------------------------------------
// --------------------------------------------
// - Componente para mostrar página No existe -
// --------------------------------------------
// --------------------------------------------
const NoExiste = () => {
  const navegar = useNavigate();

  // --------------------------------------------
  // - Método para volver a la página de inicio -
  // --------------------------------------------
  const volverPaginaInicio = () => {
    navegar("/");
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="noExiste__contenedor">
      <h2>Esa página no existe</h2>
      <button onClick={volverPaginaInicio}>Volver</button>
    </div>
  );
};

export default NoExiste;
