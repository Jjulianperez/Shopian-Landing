import CelularImg from "../../assets/celular.png";
import "./Hero.css";

const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5174"

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-glow" />
      <div className="hero-glow hero-glow--2" />

      <div className="hero-inner">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Proximamente</span>
          </div>

          <h1 className="hero-title">
            Tu talento merece una
            <span className="grad-word"> tienda </span>
            a su altura
          </h1>

          <p className="hero-subtitle">
            Convierte tu WhatsApp en una máquina de ventas. Crea tu catálogo profesional, gestiona servicios y analiza tus estadísticas, todo desde un solo lugar.
          </p>

          <div className="hero-actions">
            <a href={`${APP_URL}/register`} className="hero-cta">
              Crear mi tienda →
            </a>
            <a href="#features" className="hero-secondary">
              Ver cómo funciona
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-val">+10K</span>
              <span className="hero-stat-label">Emprendedores</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-label">Gratis para empezar</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-val">2 min</span>
              <span className="hero-stat-label">Setup inicial</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-phone-wrap">
            <div className="hero-phone-glow" />
            <img
              src={CelularImg}
              alt="App Shopian en celular"
              className="hero-phone"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

      </div>
    </section>
  );
}