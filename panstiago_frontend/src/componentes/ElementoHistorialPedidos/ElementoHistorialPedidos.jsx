import { datos } from "../../datos";

import "./elementoHistorialPedidos.css";

// -------------------------------------------------------------
// -------------------------------------------------------------
// - Componente para mostrar un pedido del historial de pedidos-
// -------------------------------------------------------------
// -------------------------------------------------------------
const ElementoHistorialPedidos = ({ pedido }) => {
  // -------
  // - JSX -
  // -------
  return (
    <div className="elementoHistorialPedidos__contenedor">
      <div className="elementoHistorialPedidos__cliente">
        <p>
          <span>Fecha pedido</span>
          {new Date(pedido.updatedAt).getDate() +
            "-" +
            (new Date(pedido.updatedAt).getMonth() + 1) +
            "-" +
            new Date(pedido.updatedAt).getFullYear()}
        </p>
        <p>
          <span>Nombre</span>
          {pedido.direccionEnvio.name}
        </p>
        <p>
          <span>Calle</span>
          {pedido.direccionEnvio.address.line1}
        </p>
        <p>
          <span>Localidad</span>
          {pedido.direccionEnvio.address.postal_code}{" "}
          {pedido.direccionEnvio.address.city}
        </p>
        <p>
          {" "}
          <span>Teléfono</span> {pedido.direccionEnvio.phone}
        </p>
      </div>

      {pedido.productos.map((producto) => {
        return (
          <div
            className="elementoHistorialPedidos__lineaPedido"
            key={producto.productoId}
          >
            <h5>{producto.precioProducto}€</h5>
            <img
              src={
                datos.find(
                  (buscar) => buscar.productoId === Number(producto.productoId)
                ).imagen
              }
              alt="imagen"
            />
            <div className="elementoHistorialPedidos__lineaPedido__nombre">
              <p>
                {
                  datos.find(
                    (buscar) =>
                      buscar.productoId === Number(producto.productoId)
                  ).nombre
                }
              </p>
              <h4> {producto.cantidadProducto}</h4>
            </div>
          </div>
        );
      })}
      <div className="elementoHistorialPedidos__total">
        <h3>Importe</h3>
        <h3>{pedido.precioTotal / 100}€</h3>
      </div>
    </div>
  );
};

export default ElementoHistorialPedidos;
