import spinner from "../../assets/spinner.gif";

import "./spinner.css";

// ------------------------------------------------------------
// ------------------------------------------------------------
// - Componente para mostrar un spinner cuando la información -
// - se está cargando                                         -
// ------------------------------------------------------------
// ------------------------------------------------------------
const Spinner = () => {
  // -------
  // - JSX -
  // -------
  return (
    <div className="spinner__contenedor">
      <img src={spinner} alt="cargando datos"></img>
    </div>
  );
};

export default Spinner;
