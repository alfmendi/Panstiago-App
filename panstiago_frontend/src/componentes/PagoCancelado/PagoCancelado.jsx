import { useNavigate } from "react-router-dom";

import "./pagoCancelado.css";

// -------------------------------------------------------
// -------------------------------------------------------
// - Componente para mostrar la página de pago cancelado -
// -------------------------------------------------------
// -------------------------------------------------------
const PagoCancelado = () => {
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
    <div className="pagoCancelado__contenedor">
      <h2>Pago cancelado</h2>
      <button onClick={volverPaginaInicio}>Volver</button>
    </div>
  );
};

export default PagoCancelado;
