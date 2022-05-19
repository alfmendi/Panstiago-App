import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import "./footer.css";

// ------------------------------------------------------
// ------------------------------------------------------
// - Componente para mostrar el footer de la aplicación -
// ------------------------------------------------------
// ------------------------------------------------------
const Footer = () => (
  // -------
  // - JSX -
  // -------
  <div className="footer__contenedor">
    <div className="footer__contacto">
      <h2>Contacto</h2>
      <p>Avenida Rosalía de Castro</p>
      <p>Santiago de Compostela</p>
      <p>123 456 789</p>
    </div>
    <div className="footer__icons__copyright">
      <div className="footer__icons">
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
      </div>
      <div className="footer__copyright">
        <p>&copy;2022 alfonsoauzmendia@gmail.com</p>
      </div>
    </div>
    <div className="footer__horario">
      <h2>Horario</h2>
      <p>Lunes - Domingo</p>
      <p>12:00 - 00:00 </p>
    </div>
  </div>
);

export default Footer;
