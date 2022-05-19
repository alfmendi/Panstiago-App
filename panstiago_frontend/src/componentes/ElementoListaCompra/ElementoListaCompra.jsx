import { useDispatch } from "react-redux";

import {
  eliminarProducto,
  incrementoUnitarioProducto,
  decrementoUnitarioProducto,
} from "../../redux/listaCompraSlice";

import "./elementoListaCompra.css";

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// - Componente para mostrar cada uno de los elementos de la lista de la compra -
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
const ElementoListaCompra = ({ elemento: { producto, cantidadProducto } }) => {
  const dispatch = useDispatch();

  // --------------------------------------------------------------------------------
  // - Método que aumentar en 1 la cantidad de un producto en la lista de la compra -
  // --------------------------------------------------------------------------------
  const aumentarCantidadUno = () => {
    dispatch(incrementoUnitarioProducto(producto.productoId));
  };

  // ---------------------------------------------------------------------------------
  // - Método que disminuir en 1 la cantidad de un producto en la lista de la compra -
  // ---------------------------------------------------------------------------------
  const disminuirCantidadUno = () => {
    dispatch(decrementoUnitarioProducto(producto.productoId));
  };

  // -------------------------------------------------------------
  // - Método para eliminar un producto de la lista de la compra -
  // -------------------------------------------------------------
  const eliminarProductoLista = () => {
    dispatch(eliminarProducto(producto.productoId));
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="elementoListaCompra__contenedor">
      <img src={producto.imagen} alt="imagen" />
      <h5>{producto.precio}€</h5>
      <div className="elementoListaCompra__columna-1">
        <h4>{producto.nombre}</h4>
        <div className="elementoListaCompra__contador">
          <button onClick={aumentarCantidadUno}>+</button>
          <span>{cantidadProducto}</span>
          <button onClick={disminuirCantidadUno}>-</button>
        </div>
      </div>
      <div className="elementoListaCompra__columna-2">
        <button onClick={eliminarProductoLista}>Eliminar</button>
        <div className="elementoListaCompra__linea">
          <p>Total</p>
          <h4>{Number((producto.precio * cantidadProducto).toFixed(2))}€</h4>
        </div>
      </div>
    </div>
  );
};

export default ElementoListaCompra;
