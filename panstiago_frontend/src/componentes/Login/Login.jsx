import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "../../api/axios";

import { alternarEstado } from "../../redux/mostrarMensajeRegistroCorrectoSlice";
import { establecerCliente } from "../../redux/clienteSlice";

import generarMensajeError from "../../error/generarMensajeError";

import exitoToast from "../../error/exitoToast";

import "./login.css";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para gestionar el login de los clientes -
// ------------------------------------------------------
// ------------------------------------------------------
const Login = () => {
  const navegar = useNavigate();

  const dispatch = useDispatch();
  const { valor } = useSelector(
    (state) => state.mostrarMensajeRegistroCorrecto
  );

  const listaCompra = useSelector((state) => state.listaCompra);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);

  // ----------------------------------------------------------
  // - UseEffect para mostrar el mensaje de Registro correcto -
  // ----------------------------------------------------------
  useEffect(() => {
    if (valor) {
      exitoToast("Registro correcto");
      setTimeout(() => {
        dispatch(alternarEstado());
      }, 3000);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ------------------------------------------------
  // - Método que gestiona el login de los clientes -
  // ------------------------------------------------
  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // Almaceno todo en el estado global de redux cliente
      // clienteId
      // nombre
      // accessToken
      dispatch(establecerCliente(respuesta.data));
      if (listaCompra.productos.length === 0) {
        navegar("/productos");
      } else {
        navegar("/listaCompra");
      }
    } catch (error) {
      generarMensajeError(error);
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="login__contenedor">
      <ToastContainer limit={1} />
      <form className="login__formulario" onSubmit={manejarLogin}>
        <div className="login__titulo">
          <h2>Inicia Sesión</h2>
        </div>
        <div className="login__entradas">
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="login__email">Email</InputLabel>
            <Input
              id="login__email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              autoComplete="off"
              required
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="login__password">Password</InputLabel>
            <Input
              id="login__password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disableRipple={true}
                    onClick={() =>
                      setMostrarPassword((valorAnterior) => !valorAnterior)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>
        </div>
        <div className="login__footer">
          <button type="submit" className="login__boton">
            INICIA SESIÓN AHORA
          </button>
          <p>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
