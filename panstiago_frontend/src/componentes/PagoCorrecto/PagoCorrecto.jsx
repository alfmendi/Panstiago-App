import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { vaciarListaCompra } from "../../redux/listaCompraSlice";

import "./pagoCorrecto.css";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para mostrar la página de pago correcto -
// ------------------------------------------------------
// ------------------------------------------------------
const PagoCorrecto = () => {
  const navegar = useNavigate();
  const dispatch = useDispatch();

  // -------------------------------------------------------------------
  // - UseEffect para vaciar la lista de la compra en el store (redux) -
  // - y eliminar dicha lista tambien en localStorage                  -
  // -------------------------------------------------------------------
  useEffect(() => {
    dispatch(vaciarListaCompra());
    localStorage.removeItem("listaCompra");
  }, [dispatch]);

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
    <div className="pagoCorrecto__contenedor">
      <h2>Pago realizado correctamente</h2>
      <button onClick={volverPaginaInicio}>Volver</button>
    </div>
  );
};

export default PagoCorrecto;
