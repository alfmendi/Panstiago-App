import { createSlice } from "@reduxjs/toolkit";

// --------------------------------------------------------------------------
// - Slice para almacenar el estado relativo al cliente en el store (redux) -
// --------------------------------------------------------------------------
const clienteSlice = createSlice({
  name: "cliente",
  initialState: {
    cliente: null,
  },
  reducers: {
    establecerCliente: (state, action) => {
      state.cliente = action.payload;
    },
  },
});

export const { establecerCliente } = clienteSlice.actions;

export default clienteSlice.reducer;
