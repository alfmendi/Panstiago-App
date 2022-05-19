import { createSlice } from "@reduxjs/toolkit";

// ---------------------------------------------------------------------------------------------------------
// - Slice para almacenar el estado del valor a mostrar cuando el registro es correcto en el store (redux) -
// ---------------------------------------------------------------------------------------------------------
const mostrarMensajeRegistroCorrectoSlice = createSlice({
  name: "mostrarMensajeRegistroCorrecto",
  initialState: { valor: false },
  reducers: {
    alternarEstado: (state) => {
      state.valor = !state.valor;
    },
  },
});

export const { alternarEstado } = mostrarMensajeRegistroCorrectoSlice.actions;

export default mostrarMensajeRegistroCorrectoSlice.reducer;
