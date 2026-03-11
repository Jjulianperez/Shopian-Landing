import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import ImgUser     from "../../assets/login.png"
import ImgProducts from "../../assets/Cargar productos.png"
import ImgShare    from "../../assets/Compartir.png"

import "./Steps.css"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    tag:    "Inicio",
    title:  "Regístrate",
    desc:   "Crea tu cuenta gratis y configura el perfil de tu negocio en menos de un minuto.",
    icon:   ImgUser,
    accent: "cyan",
  },
  {
    number: "02",
    tag:    "Catálogo",
    title:  "Sube tus productos",
    desc:   "Agregá fotos, precios, variantes y descripciones desde tu celular.",
    icon:   ImgProducts,
    accent: "mid",
  },
  {
    number: "03",
    tag:    "Ventas",
    title:  "Comparte y vende",
    desc:   "Enviá tu tienda por WhatsApp, Instagram o TikTok y empezá a recibir pedidos.",
    icon:   ImgShare,
    accent: "magenta",
  },
]

export default function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = gsap.utils.toArray<HTMLElement>(".sp-card", section)

    cards.forEach((card, i) => {
      const num     = card.querySelector(".sp-num")
      const iconBox = card.querySelector(".sp-icon-box")
      const tag     = card.querySelector(".sp-tag")
      const title   = card.querySelector("h3")
      const desc    = card.querySelector("p")
      const line    = card.querySelector(".sp-connector")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })

      // Card fades up
      tl.fromTo(card,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: i * 0.1 }
      )

      // Number counts up with a glow
      tl.fromTo(num,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        "<+0.15"
      )

      // Icon box pops in
      tl.fromTo(iconBox,
        { opacity: 0, scale: 0.8, filter: "blur(6px)" },
        { opacity: 1, scale: 1,   filter: "blur(0px)", duration: 0.45, ease: "back.out(1.8)" },
        "<+0.1"
      )

      // Tag + title + desc stagger in
      tl.fromTo([tag, title, desc],
        { y: 12, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 },
        "<+0.1"
      )

      // Connector draws in (desktop only — zero width on mobile)
      if (line) {
        tl.fromTo(line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.inOut" },
          "<+0.2"
        )
      }
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section className="sp-section" ref={sectionRef}>

      {/* Label */}
      <div className="sp-label">
        <span className="sp-label-dot" />
        Cómo funciona
      </div>

      <h2 className="sp-heading">
        Crea tu tienda en{" "}
        <span className="sp-heading-grad">3 pasos simples</span>
      </h2>
      <p className="sp-subheading">
        Sin conocimientos técnicos, sin complicaciones.<br />
        Solo seguí los pasos y empezá a vender.
      </p>

      <div className="sp-grid">
        {steps.map((step, i) => (
          <div className="sp-card" key={i} data-accent={step.accent}>

            {/* Step number — big background watermark */}
            <span className="sp-num-bg">{step.number}</span>

            {/* Top row: number chip + icon */}
            <div className="sp-top">
              <span className="sp-num">{step.number}</span>
              <div className="sp-icon-box">
                <img src={step.icon} alt={step.title} className="sp-icon-img" loading="lazy" />
              </div>
            </div>

            {/* Tag */}
            <span className="sp-tag">{step.tag}</span>

            {/* Text */}
            <h3>{step.title}</h3>
            <p>{step.desc}</p>

            {/* Connector arrow to next step (hidden on last + mobile) */}
            {i < steps.length - 1 && (
              <div className="sp-connector">
                <svg viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6 H34 M28 1 L34 6 L28 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  )
}
