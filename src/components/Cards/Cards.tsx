import "./Cards.css";

export default function Cards() {
  return (
    <section className="features">
      <div className="features-inner">

      <p className="features-label">¿Por qué Shopian?</p>

      <div className="features-grid">

        <div className="feature-col">
          <h3>😓 Problemas actuales</h3>

          <ul>
            <li>Mensajes desordenados</li>
            <li>Pedidos perdidos</li>
            <li>Responder precio por DM</li>
            <li>Fotos una por una</li>
            <li>Calcular totales manualmente</li>
          </ul>
        </div>

        <div className="feature-col">
          <h3>⚡ Solución Shopian</h3>

          <ul>
            <li>Catálogo ordenado</li>
            <li>Carrito automático</li>
            <li>Resumen perfecto en WhatsApp</li>
            <li>Productos + cantidades</li>
            <li>Total calculado</li>
          </ul>
        </div>

      </div>

      </div>
    </section>
  );
}