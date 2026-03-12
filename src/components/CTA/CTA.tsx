import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./CTA.css"

gsap.registerPlugin(ScrollTrigger)

const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5174"

// Bar heights as % of chart area (exponential growth)
const BARS = [12, 22, 35, 50, 68, 88, 100]

// Line knots matching bar tops (normalized 0-1, y is inverted for SVG)
const KNOTS = [
  { x: 30,  y: 155 },
  { x: 80,  y: 138 },
  { x: 130, y: 118 },
  { x: 180, y: 95  },
  { x: 230, y: 68  },
  { x: 280, y: 38  },
  { x: 320, y: 12  },
]

export default function CTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const btnRef      = useRef<HTMLAnchorElement>(null)
  const featRef     = useRef<HTMLDivElement>(null)
  const chartRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current!
    const chart   = chartRef.current!
    const btn     = btnRef.current!
    const feat    = featRef.current!

    const st = { trigger: section, start: "top 72%", toggleActions: "play none none none" }

    // ── Bars grow up from 0 ──
    const bars = chart.querySelectorAll<SVGRectElement>(".chart-bar")
    bars.forEach((bar, i) => {
      const finalH = parseFloat(bar.dataset.h!)
      const finalY = parseFloat(bar.dataset.y!)
      gsap.fromTo(bar,
        { attr: { height: 0, y: finalY + finalH } },
        {
          attr: { height: finalH, y: finalY },
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: st,
        }
      )
    })

    // ── Line draws in via stroke-dashoffset ──
    const line = chart.querySelector<SVGPathElement>(".chart-line")!
    const lineLen = line.getTotalLength()
    gsap.set(line, { strokeDasharray: lineLen, strokeDashoffset: lineLen })
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.inOut",
      delay: 0.3,
      scrollTrigger: st,
    })

    // ── Dots pop in one by one ──
    const dots = chart.querySelectorAll<SVGCircleElement>(".chart-dot")
    dots.forEach((dot, i) => {
      gsap.fromTo(dot,
        { attr: { r: 0 }, opacity: 0 },
        {
          attr: { r: 5 },
          opacity: 1,
          duration: 0.35,
          ease: "back.out(3)",
          delay: 0.4 + i * 0.15,
          scrollTrigger: st,
        }
      )
    })

    // ── Arrow fades in last ──
    const arrow = chart.querySelector<SVGGElement>(".chart-arrow")!
    gsap.fromTo(arrow,
      { opacity: 0, scale: 0.5, transformOrigin: "318px 12px" },
      {
        opacity: 1, scale: 1,
        duration: 0.45,
        ease: "back.out(2)",
        delay: 1.8,
        scrollTrigger: st,
      }
    )

    // ── Badge counts up ──
    const badgeVal = chart.querySelector<HTMLSpanElement>(".cta-badge-val")!
    const counter  = { v: 0 }
    gsap.to(counter, {
      v: 127,
      duration: 1.8,
      ease: "power2.out",
      delay: 0.5,
      onUpdate: () => { badgeVal.textContent = `+${Math.round(counter.v)}%` },
      scrollTrigger: st,
    })

    // ── Button entrance ──
    gsap.fromTo(btn,
      { opacity: 0, y: 22, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: btn, start: "top 88%", toggleActions: "play none none none" },
      }
    )

    // ── Chips stagger in ──
    const chips = feat.querySelectorAll(".cta-chip")
    gsap.fromTo(chips,
      { opacity: 0, y: 12 },
      {
        opacity: 1, y: 0,
        duration: 0.4,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: feat, start: "top 90%", toggleActions: "play none none none" },
      }
    )

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  // Build polyline string for the path
  const linePath = KNOTS.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const lastKnot = KNOTS[KNOTS.length - 1]
  const prevKnot = KNOTS[KNOTS.length - 2]

  // Arrow angle from last segment
  const ang = Math.atan2(lastKnot.y - prevKnot.y, lastKnot.x - prevKnot.x)
  const aLen = 14
  const ax1 = lastKnot.x + aLen * Math.cos(ang - 0.55)
  const ay1 = lastKnot.y + aLen * Math.sin(ang - 0.55)
  const ax2 = lastKnot.x + aLen * Math.cos(ang + 0.55)
  const ay2 = lastKnot.y + aLen * Math.sin(ang + 0.55)

  // SVG viewBox dimensions
  const VW = 350
  const VH = 180

  // Bar layout
  const barW     = 28
  const chartH   = 145  // usable height for bars
  const baseline = VH - 18
  const barSpacing = VW / (BARS.length + 1)

  return (
    <section className="cta-section" ref={sectionRef}>

      <div className="cta-glow cta-glow--left"  aria-hidden />
      <div className="cta-glow cta-glow--right" aria-hidden />

      {/* Label */}
      <div className="cta-label">
        <span className="cta-label-dot" />
        Empieza hoy
      </div>

      {/* Heading */}
      <h2 className="cta-heading">
        ¿Estás listo para dar el{" "}
        <span className="cta-heading-grad">siguiente paso</span>{" "}
        en tu negocio?
      </h2>

      {/* ── Chart ── */}
      <div className="cta-chart-wrap" ref={chartRef}>

        <svg
          className="cta-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            {/* Bar gradient */}
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00f2ff" stopOpacity="0.9" />
              <stop offset="50%"  stopColor="#7b3fff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#cc00ff" stopOpacity="0.75" />
            </linearGradient>

            {/* Line gradient */}
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#00f2ff" />
              <stop offset="50%"  stopColor="#9b5cff" />
              <stop offset="100%" stopColor="#cc00ff" />
            </linearGradient>

            {/* Dot glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Bar glow */}
            <filter id="barGlow" x="-20%" y="-10%" width="140%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Baseline */}
          <line
            x1="10" y1={baseline + 4}
            x2={VW - 10} y2={baseline + 4}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <line
              key={i}
              x1="10" y1={baseline - chartH * t}
              x2={VW - 10} y2={baseline - chartH * t}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          ))}

          {/* Bars */}
          {BARS.map((pct, i) => {
            const bh = (pct / 100) * chartH
            const bx = barSpacing * (i + 1) - barW / 2
            const by = baseline - bh
            return (
              <rect
                key={i}
                className="chart-bar"
                data-h={bh}
                data-y={by}
                x={bx}
                y={by}
                width={barW}
                height={bh}
                rx={5}
                fill="url(#barGrad)"
                filter="url(#barGlow)"
              />
            )
          })}

          {/* Line */}
          <path
            className="chart-line"
            d={linePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Dots */}
          {KNOTS.map((p, i) => (
            <circle
              key={i}
              className="chart-dot"
              cx={p.x}
              cy={p.y}
              r={0}  /* GSAP animates r */
              fill="#fff"
              filter="url(#glow)"
            />
          ))}

          {/* Arrow at tip */}
          <g className="chart-arrow" opacity={0}>
            <line
              x1={lastKnot.x} y1={lastKnot.y}
              x2={ax1} y2={ay1}
              stroke="#cc00ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1={lastKnot.x} y1={lastKnot.y}
              x2={ax2} y2={ay2}
              stroke="#cc00ff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Stat badge */}
        <div className="cta-badge">
          <span className="cta-badge-val">+0%</span>
          <span className="cta-badge-label">crecimiento promedio</span>
        </div>
      </div>

      {/* Subtext */}
      <p className="cta-sub">
        Automatizá, gestioná y escalá tu negocio hoy mismo.
      </p>

      {/* Button */}
      <a href={`${APP_URL}/register`} className="cta-btn" ref={btnRef as React.RefObject<HTMLAnchorElement>}>
        <span className="cta-btn-shimmer" />
        <span className="cta-btn-text">Empezar gratis hoy</span>
        <svg className="cta-btn-arrow" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Chips */}
      <div className="cta-features" ref={featRef}>
        {[
          { icon: "🛒", label: "Ventas directas WhatsApp" },
          { icon: "📊", label: "Analytics Pro" },
          { icon: "⚡", label: "CRUD catálogo" },
          { icon: "🚀", label: "+10,000 emprendedores" },
        ].map((f, i) => (
          <span className="cta-chip" key={i}>
            <span className="cta-chip-icon">{f.icon}</span>
            {f.label}
          </span>
        ))}
      </div>

    </section>
  )
}
