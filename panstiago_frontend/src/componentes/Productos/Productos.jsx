import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Card from "../Card/Card";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import axios from "../../api/axios";

import generarMensajeError from "../../error/generarMensajeError";

import { datos } from "../../datos";

import "./productos.css";

// -----------------------------------------------------------
// -----------------------------------------------------------
// - Componente para mostrar todos los productos disponibles -
// -----------------------------------------------------------
// -----------------------------------------------------------
const Productos = () => {
  const { cantidadTotal } = useSelector((state) => state.listaCompra);
  const navegar = useNavigate();

  const [productos, setProductos] = useState([]);

  // ----------------------------------------------------------
  // - UseEffect para obtener los productos desde el servidor -
  // ----------------------------------------------------------
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const resultado = await axios.get("/api/productos");
        // Todo esto para que la información no se pueda alterar en el cliente.
        // No me apetecía crear un crud para los productos (se han hardcodeado).
        // Almaceno toda la información de los productos en un fichero de datos
        // en el servidor y guardo en el cliente las imagenes de esos productos
        // (para no tener que estar mandandolas)
        const productosConImagen = resultado.data.map((producto) => {
          const imagen = datos.find(
            (elemento) => elemento.productoId === producto.productoId
          );
          producto.imagen = imagen.imagen;
          return producto;
        });
        setProductos(productosConImagen);
      } catch (error) {
        generarMensajeError(error);
      }
    };
    obtenerProductos();
  }, []);

  // ------------------------------------------
  // - Método para ir a la lista de la compra -
  // ------------------------------------------
  const mostrarListaCompra = () => {
    navegar("/listaCompra");
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="productos__contenedor">
      <div
        className={
          cantidadTotal > 0
            ? "productos__atencion productos__carro"
            : "productos__carro"
        }
        onClick={mostrarListaCompra}
      >
        <h4>{cantidadTotal}</h4>
        <ShoppingCartIcon />
      </div>
      {productos.map((bocadillo) => (
        <Card key={bocadillo.productoId} bocadillo={bocadillo} />
      ))}
    </div>
  );
};

export default Productos;
