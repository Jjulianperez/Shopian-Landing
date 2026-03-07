import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-glow" />

      <div className="hero-content">

        <h1 className="hero-title">
          Tu talento merece una
          <span className="grad-word"> tienda </span>
          a su altura
        </h1>

        <p className="hero-subtitle">
          Convierte tu WhatsApp en una máquina de ventas. Crea tu catálogo profesional, gestiona servicios y analiza tus estadísticas, todo desde un solo lugar.
        </p>

        <button className="hero-cta">
          Crear mi tienda →
        </button>

      </div>
    </section>
  );
}