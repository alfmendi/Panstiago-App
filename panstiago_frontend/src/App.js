import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { cargarEstadoDesdeLocalStorage } from "./redux/listaCompraSlice";

import Layout from "./paginas/Layout/Layout";

import LoginPersistente from "./componentes/LoginPersistente";

import Login from "./componentes/Login/Login";
import Registro from "./componentes/Registro/Registro";
import Hero from "./componentes/Hero/Hero";
import Productos from "./componentes/Productos/Productos";
import ListaCompra from "./componentes/ListaCompra/ListaCompra";

import PagoCorrecto from "./componentes/PagoCorrecto/PagoCorrecto";
import PagoCancelado from "./componentes/PagoCancelado/PagoCancelado";

import ContenidoProtegido from "./componentes/ContenidoProtegido";

import HistorialPedidos from "./componentes/HistorialPedidos/HistorialPedidos";

import NoExiste from "./componentes/NoExiste/NoExiste";

// -----------------------------------------
// -----------------------------------------
// - Componente principal de la aplicación -
// -----------------------------------------
// -----------------------------------------
const App = () => {
  const dispatch = useDispatch();

  // ---------------------------------------------------------------
  // - UseEffect para comprobar si existe la lista de la compra    -
  // - en localStorage. La almaceno también en localStorage porque -
  // - al hacer F5 se pierde                                       -
  // ---------------------------------------------------------------
  useEffect(() => {
    const estadoAlmacenadoLocalStorage = JSON.parse(
      localStorage.getItem("listaCompra")
    );
    if (estadoAlmacenadoLocalStorage) {
      if (estadoAlmacenadoLocalStorage.productos.length === 0) {
        localStorage.removeItem("listaCompra");
      }
      dispatch(cargarEstadoDesdeLocalStorage(estadoAlmacenadoLocalStorage));
    } else {
      // console.log("App.js: No hay estado almacenado en localStorage...");
    }
  }, [dispatch]);

  // -------
  // - JSX -
  // -------
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Rutas públicas */}
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={<Login />} />
          {/* Quiero que estas rutas sean persistentes, es decir,
              que al hacer F5 vuelva a la ruta en la que estaba */}
          <Route element={<LoginPersistente />}>
            <Route path="" element={<Hero />} />
            <Route path="productos" element={<Productos />} />
            <Route path="listaCompra" element={<ListaCompra />} />
            <Route path="checkoutCorrecto" element={<PagoCorrecto />} />
            <Route path="checkoutCancelado" element={<PagoCancelado />} />
            {/* Rutas privadas*/}
            <Route element={<ContenidoProtegido />}>
              <Route path="historialPedidos" element={<HistorialPedidos />} />
            </Route>
          </Route>
          {/* Ruta en caso de error */}
          <Route path="*" element={<NoExiste />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
