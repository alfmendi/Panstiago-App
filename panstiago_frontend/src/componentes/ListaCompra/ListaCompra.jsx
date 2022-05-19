import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

import ElementoListaCompra from "../ElementoListaCompra/ElementoListaCompra";

import "./listaCompra.css";

// -------------------------------------------------
// -------------------------------------------------
// - Componente para mostrar la lista de la compra -
// -------------------------------------------------
// -------------------------------------------------
const ListaCompra = () => {
  const axiosPrivado = useAxiosPrivado();

  const { cliente } = useSelector((state) => state.cliente);
  const listaCompra = useSelector((state) => state.listaCompra);

  const navegar = useNavigate();

  // ----------------------------------------------
  // - Método para volver a la lista de productos -
  // ----------------------------------------------
  const volverListaProductos = () => {
    navegar("/productos");
  };

  // ----------------------------------------------
  // - Método para gestionar el pago desde stripe -
  // ----------------------------------------------
  const manejarCompra = async () => {
    if (cliente) {
      try {
        // Esta sería la ruta privada (es necesario estar logeado para poder hacer el pago)
        // También se debería pasar el clienteId,
        // pero se obtendrá desde req.cliente en el servidor
        const resultado = await axiosPrivado.post(
          "/api/stripe/create-checkout-session",
          listaCompra
        );
        if (resultado.data.url) {
          window.location.href = resultado.data.url;
        }
      } catch (error) {
        generarMensajeError(error);
      }
    } else {
      navegar("/login");
    }
  };

  // -------
  // - JSX -
  // -------
  if (listaCompra.productos.length === 0) {
    return (
      <div className="listaCompra__vacia">
        <h2>Tu cesta está vacía</h2>
        <button onClick={volverListaProductos}>Volver</button>
      </div>
    );
  }

  return (
    <div className="listaCompra__contenedor">
      <div className="listaCompra__cabecera">
        <h2>Mi pedido</h2>
        <button onClick={volverListaProductos}>Volver</button>
      </div>
      <div className="listaCompra__tabla">
        <div className="listaCompra__productos">
          {listaCompra.productos.map((elemento) => (
            <ElementoListaCompra
              key={elemento.producto.productoId}
              elemento={elemento}
            />
          ))}
        </div>
        <div className="listaCompra__totales">
          <h2>Importe</h2>
          <h3>{listaCompra.precioTotal}€</h3>
          <button onClick={manejarCompra}>Comprar</button>
          <div className="listaCompra__infoTarjeta">
            <h4>Datos para pruebas</h4>
            <p>Info de la tarjeta</p>
            <p>4242 4242 4242 4242</p>
            <br />
            <p>MM/AA</p>
            <p>12/24</p>
            <br />
            <p>CVC</p>
            <p>123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaCompra;
