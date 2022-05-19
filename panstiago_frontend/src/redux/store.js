import { configureStore } from "@reduxjs/toolkit";

import listaCompraReducer from "./listaCompraSlice";
import mostrarMensajeRegistroCorrectoReducer from "./mostrarMensajeRegistroCorrectoSlice";
import clienteReducer from "./clienteSlice";

export const store = configureStore({
  reducer: {
    listaCompra: listaCompraReducer,
    mostrarMensajeRegistroCorrecto: mostrarMensajeRegistroCorrectoReducer,
    cliente: clienteReducer,
  },
  // Esta línea permite deshabilitar redux dev tools en produción y así evitar que alguién
  // pueda acceder al estado y comprobar por ejemplo el valor de access token
  devTools: process.env.NODE_ENV !== "production",
});
