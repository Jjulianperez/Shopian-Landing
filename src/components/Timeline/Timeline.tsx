import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import ImgCarito    from "../../assets/LogoShopian.png"
import ImgCelular   from "../../assets/celular.png"
import ImgPanelCRUD from "../../assets/Estadisticas.png"
import ImgRoles     from "../../assets/Roles.png"

import "./Timeline.css"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    img:   ImgCarito,
    step:  "01",
    tag:   "Productos",
    title: "Catálogo Inteligente",
    desc:  "Tus productos y servicios organizados con fotos, precios y variantes, listos para vender en segundos.",
    side:  "right",
  },
  {
    img:   ImgCelular,
    step:  "02",
    tag:   "Ventas",
    title: "WhatsApp Checkout",
    desc:  "Tu cliente arma su carrito y te llega un mensaje con el resumen completo del pedido, sin fricción.",
    side:  "left",
  },
  {
    img:   ImgPanelCRUD,
    step:  "03",
    tag:   "Control",
    title: "Panel CRUD y Descuentos",
    desc:  "Administrá productos, aplicá descuentos y gestioná promociones desde un panel simple y rápido.",
    side:  "right",
  },
  {
    img:   ImgRoles,
    step:  "04",
    tag:   "Equipo",
    title: "Gestión de Equipo",
    desc:  "Asigná roles, controlá permisos y escala tu negocio sin perder el control de nada.",
    side:  "left",
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const ballRef    = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section   = sectionRef.current
    const ball      = ballRef.current
    const lineFill  = lineFillRef.current
    if (!section || !ball || !lineFill) return

    const items    = gsap.utils.toArray<HTMLElement>(".tl-item", section)
    const lineWrap = section.querySelector<HTMLElement>(".tl-line-wrap")!
    const lineH    = lineWrap.offsetHeight

    items.forEach((item) => {
      const icon     = item.querySelector<HTMLElement>(".tl-icon-wrap")!
      const ring     = item.querySelector<HTMLElement>(".tl-ring")!
      const content  = item.querySelector<HTMLElement>(".tl-content-card")!
      const glow     = item.querySelector<HTMLElement>(".tl-glow-burst")!
      const iconSide = item.querySelector<HTMLElement>(".tl-icon-side")!
      const stepNum  = item.querySelector<HTMLElement>(".tl-step-num")!
      const imgEl    = item.querySelector<HTMLElement>(".tl-icon-img")!
      const connector = item.querySelector<HTMLElement>(".tl-connector")!
      const side     = item.dataset.side

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      })

      // Move ball to icon position
      const lineTop = lineWrap.getBoundingClientRect().top
      const iconTop = iconSide.getBoundingClientRect().top
      const targetY = iconTop - lineTop

      // Fill the line up to this point
      const fillPct = Math.min(100, ((targetY / lineH) * 100) + 4)

      tl.to(ball, { y: targetY, ease: "power2.inOut", duration: 0.5 })

      // Line fill grows
      tl.to(lineFill, { height: `${fillPct}%`, ease: "power2.inOut", duration: 0.5 }, "<")

      // Ball impact pulse
      tl.to(ball, { scale: 2.4, opacity: 0.55, duration: 0.14, ease: "power2.out" })

      // Glow burst from icon
      tl.fromTo(glow,
        { scale: 0, opacity: 1 },
        { scale: 4.2, opacity: 0, duration: 0.5, ease: "power2.out" },
        "<"
      )

      // Icon box activates — border lights up, bg appears
      tl.to(icon, {
        borderColor: "rgba(0,242,255,0.7)",
        boxShadow: "0 0 0 1px rgba(0,242,255,0.2), 0 0 24px rgba(0,242,255,0.4), 0 0 60px rgba(0,242,255,0.2)",
        background: "rgba(0,242,255,0.08)",
        scale: 1.12,
        duration: 0.38,
        ease: "back.out(2)",
      }, "<+0.04")

      // Image brightens
      tl.to(imgEl, { opacity: 1, filter: "brightness(1.5) saturate(1.3)", duration: 0.3 }, "<")

      // Step number brightens
      tl.to(stepNum, { opacity: 1, color: "#00f2ff", duration: 0.3 }, "<")

      // Ring ripple
      tl.fromTo(ring,
        { scale: 1, opacity: 0.8 },
        { scale: 3.2, opacity: 0, duration: 0.65, ease: "power1.out" },
        "<"
      )

      // Ball back to normal
      tl.to(ball, { scale: 1, opacity: 1, duration: 0.22 }, "<+0.1")

      // Connector line draws in
      tl.fromTo(connector,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
        "<+0.05"
      )

      // Content card slides in + reveals
      const fromX = side === "right" ? -55 : 55
      tl.fromTo(content,
        { x: fromX, opacity: 0, filter: "blur(10px)", y: 8 },
        { x: 0, opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6, ease: "power3.out" },
        "<+0.08"
      )

      // Item itself fades from dim to full
      tl.to(item, { opacity: 1, duration: 0.3 }, "<")
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section className="tl-section" ref={sectionRef}>

      {/* Section label */}
      <div className="tl-section-label">
        <span className="tl-section-dot" />
        Características
      </div>

      <h2 className="tl-heading">
        Todo lo que necesitas para{" "}
        <span className="tl-heading-grad">vender más y mejor</span>
      </h2>
      <p className="tl-subheading">
        Cada herramienta pensada para que puedas vender más,<br />
        sin complicarte la vida.
      </p>

      <div className="tl-stage">

        {/* Vertical line */}
        <div className="tl-line-wrap">
          <div className="tl-line-bg" />
          <div className="tl-line-fill" ref={lineFillRef} />

          <div className="tl-ball" ref={ballRef}>
            <div className="tl-ball-core" />
            <div className="tl-ball-halo" />
          </div>
        </div>

        {/* Items */}
        <div className="tl-items">
          {features.map((f, i) => (
            <div className="tl-item" key={i} data-side={f.side}>

              {/* Icon column */}
              <div className="tl-icon-side">
                <div className="tl-ring" />
                <div className="tl-glow-burst" />

                <div className="tl-icon-wrap">
                  <img src={f.img} alt={f.title} className="tl-icon-img" loading="lazy" />
                </div>

                <span className="tl-step-num">{f.step}</span>
              </div>

              {/* Horizontal connector */}
              <div
                className="tl-connector"
                data-side={f.side}
              />

              {/* Content card */}
              <div className="tl-content-card">
                <span className="tl-tag">{f.tag}</span>
                <h3 className="tl-content-title">{f.title}</h3>
                <p className="tl-content-desc">{f.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
