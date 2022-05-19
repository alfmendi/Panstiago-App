import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import imagen from "../../assets/imagen_01.png";

import "./hero.css";

// ---------------------------------------------------
// ---------------------------------------------------
// - Componente que muestra el hero de la aplicación -
// ---------------------------------------------------
// ---------------------------------------------------
const Hero = () => {
  const { cantidadTotal } = useSelector((state) => state.listaCompra);
  const navegar = useNavigate();

  // ---------------------------------------------
  // - Método para mostrar la lista de la compra -
  // ---------------------------------------------
  const mostrarListaCompra = () => {
    navegar("/listaCompra");
  };

  // -------------------------------------------
  // - Método hacer ir a la lista de productos -
  // -------------------------------------------
  const hacerPedido = () => {
    navegar("productos");
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="hero__contenedor" id="inicio">
      {cantidadTotal > 0 && (
        <div
          className={"productos__atencion productos__carro"}
          onClick={mostrarListaCompra}
        >
          <h4>{cantidadTotal}</h4>
          <ShoppingCartIcon />
        </div>
      )}
      <div className="hero__izquierda">
        <h1>¿Que te apetece pedir hoy?</h1>
        <h3>Haz tu pedido y te lo enviamos a tu domicilio</h3>
        <p>Ponemos a tu disposición la mejor selección de bocadillos</p>
        <button className="hero__boton" onClick={hacerPedido}>
          Haz tu pedido
        </button>
      </div>
      <div className="hero__derecha">
        <h3>Calidad</h3>
        <img src={imagen} alt="imagen" />
        <h3>Precio</h3>
      </div>
    </div>
  );
};

export default Hero;
