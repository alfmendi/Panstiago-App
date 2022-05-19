import { createSlice } from "@reduxjs/toolkit";

// ---------------------------------------------------------------------------------------
// - Slice para almacenar el estado relativo a la lista de la compra en el store (redux) -
// ---------------------------------------------------------------------------------------
const listaCompraSlice = createSlice({
  name: "listaCompra",
  initialState: {
    productos: [],
    cantidadTotal: 0,
    precioTotal: 0,
  },
  reducers: {
    // Este reducer se utiliza para cargar el estado
    // de la lista de la compra almacenado en local storage.
    // Necesario cuando se hace un F5 (recarga de la página)
    cargarEstadoDesdeLocalStorage: (state, action) => {
      state.productos = action.payload.productos;
      state.cantidadTotal = action.payload.cantidadTotal;
      state.precioTotal = action.payload.precioTotal;
    },
    addProducto: (state, action) => {
      const nuevoProducto = action.payload.producto;
      const existeProducto = state.productos.find(
        (elemento) => elemento.producto?.productoId === nuevoProducto.productoId
      );
      if (existeProducto) {
        existeProducto.cantidadProducto += action.payload.cantidad;
      } else {
        state.productos.push({
          producto: nuevoProducto,
          cantidadProducto: action.payload.cantidad,
        });
      }
      state.cantidadTotal += action.payload.cantidad;
      state.precioTotal += action.payload.total;
      state.precioTotal = Number(state.precioTotal.toFixed(2));
      // Almaceno el estado de la cesta en la localStorage del navegador.
      // Lo hago para mantener el estado cada vez que se hace un F5
      localStorage.setItem("listaCompra", JSON.stringify(state));
    },
    eliminarProducto: (state, action) => {
      // En action.payload he pasado el nombre del elemento a eliminar
      const productoId = action.payload;
      const elementoEliminar = state.productos.find(
        (elemento) => elemento.producto.productoId === productoId
      );
      state.cantidadTotal -= elementoEliminar.cantidadProducto;
      state.precioTotal -=
        elementoEliminar.cantidadProducto * elementoEliminar.producto.precio;
      state.precioTotal = Number(state.precioTotal.toFixed(2));
      state.productos = state.productos.filter(
        (elemento) => elemento.producto.productoId !== productoId
      );
      // Almaceno el estado de la cesta en la localStorage del navegador.
      // Lo hago para mantener el estado cada vez que se hace un F5
      localStorage.setItem("listaCompra", JSON.stringify(state));
    },
    incrementoUnitarioProducto: (state, action) => {
      // En action.payload he pasado el nombre del elemento a incrementar
      const productoId = action.payload;
      const elementoIncrementar = state.productos.find(
        (elemento) => elemento.producto.productoId === productoId
      );
      elementoIncrementar.cantidadProducto += 1;
      state.cantidadTotal += 1;
      state.precioTotal += elementoIncrementar.producto.precio;
      state.precioTotal = Number(state.precioTotal.toFixed(2));
      // Almaceno el estado de la cesta en la localStorage del navegador.
      // Lo hago para mantener el estado cada vez que se hace un F5
      localStorage.setItem("listaCompra", JSON.stringify(state));
    },
    decrementoUnitarioProducto: (state, action) => {
      // En action.payload he pasado el nombre del elemento a incrementar
      const productoId = action.payload;
      const elementoIncrementar = state.productos.find(
        (elemento) => elemento.producto.productoId === productoId
      );
      if (elementoIncrementar.cantidadProducto > 1) {
        elementoIncrementar.cantidadProducto -= 1;
        state.cantidadTotal -= 1;
        state.precioTotal -= elementoIncrementar.producto.precio;
        state.precioTotal = Number(state.precioTotal.toFixed(2));
        // Almaceno el estado de la cesta en la localStorage del navegador.
        // Lo hago para mantener el estado cada vez que se hace un F5
        localStorage.setItem("listaCompra", JSON.stringify(state));
      }
    },
    vaciarListaCompra: (state) => {
      state.productos = [];
      state.cantidadTotal = 0;
      state.precioTotal = 0;
    },
  },
});

export const {
  cargarEstadoDesdeLocalStorage,
  addProducto,
  eliminarProducto,
  incrementoUnitarioProducto,
  decrementoUnitarioProducto,
  vaciarListaCompra,
} = listaCompraSlice.actions;

export default listaCompraSlice.reducer;
