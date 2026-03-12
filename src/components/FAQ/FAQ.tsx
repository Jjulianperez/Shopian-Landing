import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./FAQ.css"

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: "¿Cuánto tiempo dura el período de prueba?",
    a: "14 días gratis con acceso completo al plan que elijas. Sin tarjeta de crédito ni compromisos.",
  },
  {
    q: "¿Necesito conocimientos técnicos para usar Shopian?",
    a: "Para nada. En menos de 2 minutos ya tenés tu tienda activa: registrate, cargá tus productos y compartí el link.",
  },
  {
    q: "¿Cómo funciona el carrito de WhatsApp?",
    a: "Tus clientes eligen productos desde tu catálogo, los agregan al carrito y al finalizar te llega un mensaje de WhatsApp con el resumen completo del pedido.",
  },
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. Podés upgradear o downgradear cuando quieras desde el panel de tu tienda. Los cambios aplican de inmediato.",
  },
  {
    q: "¿Puedo invitar empleados a mi panel?",
    a: "Sí. Con los planes Pro y Business podés invitar colaboradores y asignarles roles con distintos niveles de acceso.",
  },
  {
    q: "¿Shopian cobra comisión por cada venta?",
    a: "No. Shopian cobra solo la suscripción mensual, sin comisiones por ventas. Lo que vendés es tuyo.",
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i))

  useEffect(() => {
    const section = sectionRef.current!
    gsap.fromTo(
      section.querySelectorAll(".faq-item"),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 78%", toggleActions: "play none none none" },
      }
    )
    return () => ScrollTrigger.getAll().forEach(s => s.kill())
  }, [])

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="faq-label">
        <span className="faq-label-dot" />
        Preguntas frecuentes
      </div>

      <h2 className="faq-heading">
        Todo lo que querías saber
      </h2>

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${open === i ? "faq-item--open" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="faq-question">
              <span>{item.q}</span>
              <span className="faq-icon">{open === i ? "−" : "+"}</span>
            </div>
            {open === i && (
              <div className="faq-answer">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
