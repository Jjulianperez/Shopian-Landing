import { useState } from "react";
import LogoShopian from "../../assets/LogoShopian.png";
import "./Navbar.css";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">

      {/* LOGO */}
      <div className="nav-logo">
        <div className="nav-logo-icon">
          <img
            src={LogoShopian}
            alt="Logo Shopian"
            className="nav-logo-img"
          />
        </div>
        <span className="nav-logo-text">Shopian</span>
      </div>

      {/* LINKS DESKTOP */}
      <div className="nav-links">
        <a href="#features">Funciones</a>
        <a href="#pricing">Precios</a>
        <a href="#faq">FAQ</a>
      </div>

      {/* ACTIONS */}
      <div className="nav-actions">
        <button className="nav-login">Ingresar</button>
        <button className="nav-cta">Crear tienda</button>
      </div>

      {/* HAMBURGER */}
      <div
        className={`nav-hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </div>

      {/* MOBILE MENU */}
      <div className={`nav-mobile ${open ? "open" : ""}`}>
        <a href="#features" onClick={()=>setOpen(false)}>Funciones</a>
        <a href="#pricing" onClick={()=>setOpen(false)}>Precios</a>
        <a href="#faq" onClick={()=>setOpen(false)}>FAQ</a>

        <button className="nav-login">Ingresar</button>
        <button className="nav-cta">Crear tienda</button>
      </div>

    </nav>
  );
}