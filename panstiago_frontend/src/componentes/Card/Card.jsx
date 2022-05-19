import { useState } from "react";

import { useDispatch } from "react-redux";

import { addProducto } from "../../redux/listaCompraSlice";

import "./card.css";

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// - Componente en el que se muestra el contenido de cada producto -
// -----------------------------------------------------------------
// -----------------------------------------------------------------
const Card = ({
  bocadillo: { productoId, imagen, nombre, precio, ingredientes },
}) => {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(1);

  // ---------------------------------------------------------------
  // - Método para aumentar la cantidad de un producto en 1 unidad -
  // ---------------------------------------------------------------
  const aumentarCantidad = () => {
    setCantidad((prev) => prev + 1);
  };

  // --------------------------------------------------------------
  // - Método para reducir la cantidad de un producto en 1 unidad -
  // --------------------------------------------------------------
  const reducirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  // ---------------------------------------------------
  // - Método para enviar el producto al store (redux) -
  // ---------------------------------------------------
  const enviarProducto = () => {
    dispatch(
      addProducto({
        producto: { productoId, imagen, nombre, precio, ingredientes },
        cantidad,
        total: Number((cantidad * precio).toFixed(2)),
      })
    );
    setCantidad(1);
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="card__contenedor">
      <img src={imagen} alt="imagen" />
      <div className="card__info">
        <div>
          <h1>{nombre}</h1>
          <h2>{precio}€</h2>
        </div>
        <p>{ingredientes}</p>
      </div>
      <div className="card__comprar">
        <div className="card__contador">
          <button onClick={aumentarCantidad}>+</button>
          <span>{cantidad}</span>
          <button onClick={reducirCantidad}>-</button>
        </div>
        <button className="card__boton" onClick={enviarProducto}>
          Añadir
        </button>
      </div>
    </div>
  );
};

export default Card;
