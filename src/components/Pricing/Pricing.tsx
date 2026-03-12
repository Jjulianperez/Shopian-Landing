import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Pricing.css"

gsap.registerPlugin(ScrollTrigger)

const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5174"

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Gratis",
    period: "siempre",
    highlight: false,
    badge: null,
    features: [
      "Hasta 10 productos",
      "Catálogo público",
      "Carrito + WhatsApp checkout",
      "1 usuario (vos)",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15",
    period: "/ mes",
    highlight: true,
    badge: "Más popular",
    features: [
      "Productos ilimitados",
      "Todo lo del plan Starter",
      "Hasta 3 usuarios / empleados",
      "Estadísticas avanzadas",
      "Promociones y descuentos",
      "Métodos de pago personalizados",
      "Soporte prioritario",
    ],
    cta: "Probar 14 días gratis",
  },
  {
    id: "business",
    name: "Business",
    price: "$29",
    period: "/ mes",
    highlight: false,
    badge: null,
    features: [
      "Todo lo del plan Pro",
      "Usuarios ilimitados",
      "Dominio personalizado",
      "Acceso a API",
      "Onboarding dedicado",
      "SLA garantizado",
    ],
    cta: "Probar 14 días gratis",
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current!
    const cards = section.querySelectorAll(".pricing-card")

    gsap.fromTo(
      section.querySelector(".pricing-label"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, scrollTrigger: { trigger: section, start: "top 80%" } }
    )

    gsap.fromTo(
      section.querySelector(".pricing-heading"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, scrollTrigger: { trigger: section, start: "top 80%" } }
    )

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      }
    )

    return () => ScrollTrigger.getAll().forEach(s => s.kill())
  }, [])

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="pricing-glow pricing-glow--left"  aria-hidden />
      <div className="pricing-glow pricing-glow--right" aria-hidden />

      <div className="pricing-label">
        <span className="pricing-label-dot" />
        Precios
      </div>

      <h2 className="pricing-heading">
        Empezá gratis,{" "}
        <span className="pricing-heading-grad">escalá cuando quieras</span>
      </h2>

      <p className="pricing-subheading">
        14 días de prueba gratis en todos los planes de pago. Sin tarjeta de crédito.
      </p>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${plan.highlight ? "pricing-card--highlight" : ""}`}
          >
            {plan.badge && (
              <div className="pricing-badge">{plan.badge}</div>
            )}

            <div className="pricing-plan-name">{plan.name}</div>

            <div className="pricing-price-wrap">
              <span className="pricing-price">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>

            <ul className="pricing-features">
              {plan.features.map((f, i) => (
                <li key={i} className="pricing-feature">
                  <span className="pricing-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={`${APP_URL}/register`}
              className={`pricing-cta ${plan.highlight ? "pricing-cta--highlight" : ""}`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
