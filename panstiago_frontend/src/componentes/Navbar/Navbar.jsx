import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import axios from "../../api/axios";

import { establecerCliente } from "../../redux/clienteSlice";

import logo from "../../assets/bocadillo.png";

import "./navbar.css";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para mostrar el navbar de la aplicación -
// ------------------------------------------------------
// ------------------------------------------------------
const Navbar = () => {
  const dispatch = useDispatch();
  const { cliente } = useSelector((state) => state.cliente);

  const [mostrarMenu, setMostrarMenu] = useState(false);

  const navegar = useNavigate();
  const location = useLocation();

  // --------------------------------------------
  // - Método para volver a la página principal -
  // --------------------------------------------
  const volverPaginaPrincipal = () => {
    navegar("");
  };

  // -------------------------------------------
  // - Método para enviar a la página de login -
  // -------------------------------------------
  const hacerLogin = () => {
    navegar("login");
  };

  // -----------------------------------------------------------
  // - Método que te envia a la página de historial de pedidos -
  // -----------------------------------------------------------
  const manejarHistorialPedidos = () => {
    setMostrarMenu(false);
    navegar("historialPedidos");
  };

  // ---------------------------------
  // - Método que gestiona el logout -
  // ---------------------------------
  const manejarSalir = async () => {
    try {
      dispatch(establecerCliente(null));
      setMostrarMenu(false);
      await axios.get("/api/tokens/borrarRefreshToken", {
        withCredentials: true,
      });
    } catch (error) {
    } finally {
      navegar("");
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <nav className="navbar__contenedor">
      <div className="navbar__icono" onClick={volverPaginaPrincipal}>
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar__logo" onClick={volverPaginaPrincipal}>
        <span>P</span>
        <span>a</span>
        <span>n</span>
        <span>s</span>
        <span>t</span>
        <span>i</span>
        <span>a</span>
        <span>g</span>
        <span>o</span>
      </div>
      <div className="navbar__login">
        {location.pathname === "/login" || location.pathname === "/registro" ? (
          <button onClick={volverPaginaPrincipal}>Volver</button>
        ) : !cliente?.nombre ? (
          <button onClick={hacerLogin}>Iniciar Sesión</button>
        ) : (
          <>
            <h3>Hola {cliente?.nombre.split(" ")[0]}</h3>
            {!mostrarMenu ? (
              <div className="navbar__menu">
                <MenuIcon onClick={() => setMostrarMenu(true)} />
              </div>
            ) : (
              <div className="navbar__menu">
                <CloseIcon onClick={() => setMostrarMenu(false)} />
                <div className="navbar__menu__opciones slide-bottom">
                  <button onClick={manejarHistorialPedidos}>
                    Historial pedidos
                  </button>
                  <button onClick={manejarSalir}>Salir</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
