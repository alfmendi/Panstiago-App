import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import useAxiosPrivado from "../../hooks/useAxiosPrivado";

import generarMensajeError from "../../error/generarMensajeError";

import ElementoHistorialPedidos from "../ElementoHistorialPedidos/ElementoHistorialPedidos";

import "./historialPedidos.css";

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// - Componente para mostrar el historial de pedidos de un cliente -
// -----------------------------------------------------------------
// -----------------------------------------------------------------
const HistorialPedidos = () => {
  const axiosPrivado = useAxiosPrivado();

  const { cliente } = useSelector((state) => state.cliente);

  const navegar = useNavigate();

  const [historialPedidos, setHistorialPedidos] = useState([]);

  // ----------------------------------------------------------------
  // - UseEffect para obtener el historial de pedidos de un cliente -
  // ----------------------------------------------------------------
  useEffect(() => {
    const conseguirHistorialPedidos = async () => {
      try {
        const resultado = await axiosPrivado.get(
          `/api/pedidos/${cliente.clienteId}`
        );
        setHistorialPedidos(resultado.data);
      } catch (error) {
        generarMensajeError(error);
      }
    };

    conseguirHistorialPedidos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ----------------------------------------------
  // - Método para volver a la lista de productos -
  // ----------------------------------------------
  const volverListaProductos = () => {
    navegar("/productos");
  };

  // -------
  // - JSX -
  // -------
  if (historialPedidos.length === 0) {
    return (
      <div className="historialPedidos__vacia">
        <h2>Historial de pedidos vacío</h2>
        <button onClick={volverListaProductos}>Volver</button>
      </div>
    );
  }

  return (
    <div className="historialPedidos__contenedor">
      <div className="historialPedidos__cabecera">
        <h2>Mi historial pedidos</h2>
        <button onClick={volverListaProductos}>Volver</button>
      </div>
      <div className="historialPedidos__productos">
        {historialPedidos.map((pedido) => (
          <ElementoHistorialPedidos key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </div>
  );
};

export default HistorialPedidos;
