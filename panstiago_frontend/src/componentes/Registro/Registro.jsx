import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";

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

import generarMensajeError from "../../error/generarMensajeError";

import "./registro.css";

// ---------------------------------------------------------
// ---------------------------------------------------------
// - Componente para gestionar el registro de los clientes -
// ---------------------------------------------------------
// ---------------------------------------------------------
const Registro = () => {
  const dispatch = useDispatch();

  const navegar = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);

  // ---------------------------------------------------
  // - Método que gestiona el registro de los clientes -
  // ---------------------------------------------------
  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmarPassword) {
        throw new Error("Los passwords no coinciden");
      }
      await axios.post(
        "/api/auth/registro",
        { nombre, email, password },
        { withCredentials: true }
      );

      dispatch(alternarEstado());
      navegar("/login");
    } catch (error) {
      generarMensajeError(error);
    }
  };

  // -------
  // - JSX -
  // -------
  return (
    <div className="registro__contenedor">
      <ToastContainer limit={1} />
      <form className="registro__formulario" onSubmit={manejarRegistro}>
        <div className="registro__titulo">
          <h2>Regístrate</h2>
        </div>
        <div className="registro__entradas">
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="registro__nombre">Nombre</InputLabel>
            <Input
              id="registro__nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              label="Nombre"
              autoComplete="off"
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="registro__email">Email</InputLabel>
            <Input
              id="registro__email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              autoComplete="off"
              required
            />
          </FormControl>
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="registro__password">Password</InputLabel>
            <Input
              id="registro__password"
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
          <FormControl variant="standard" size="small" required>
            <InputLabel htmlFor="registro__confirmar__password">
              Confirmar Password
            </InputLabel>
            <Input
              id="registro__confirmar__password"
              type={mostrarConfirmarPassword ? "text" : "password"}
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disableRipple={true}
                    onClick={() =>
                      setMostrarConfirmarPassword(
                        (valorAnterior) => !valorAnterior
                      )
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {mostrarConfirmarPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmar Password"
              required
            />
          </FormControl>
        </div>
        <div className="registro__footer">
          <button type="submit" className="registro__boton">
            REGÍSTRATE AHORA
          </button>
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registro;
