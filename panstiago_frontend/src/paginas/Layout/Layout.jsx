import { Outlet } from "react-router-dom";

import Footer from "../../componentes/Footer/Footer";
import Navbar from "../../componentes/Navbar/Navbar";

// --------------------------------------------------------------
// --------------------------------------------------------------
// - Componente que contiene la estructura de todas las páginas -
// --------------------------------------------------------------
// --------------------------------------------------------------
const Layout = () => {
  // -------
  // - JSX -
  // -------
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
