import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Footer.css"

gsap.registerPlugin(ScrollTrigger)

const SOCIAL = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current!
    const st = { trigger: footer, start: "top 90%", toggleActions: "play none none none" }

    // Logo flicker-in
    const logo = footer.querySelector(".ft-logo-text")!
    gsap.fromTo(logo,
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out", scrollTrigger: st }
    )

    // Center content fades up
    gsap.fromTo(footer.querySelector(".ft-center"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15, scrollTrigger: st }
    )

    // Social icons stagger
    const icons = footer.querySelectorAll(".ft-social-btn")
    gsap.fromTo(icons,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(2)", delay: 0.25, scrollTrigger: st }
    )

    // Softian logo
    gsap.fromTo(footer.querySelector(".ft-softian"),
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.3, scrollTrigger: st }
    )

    return () => ScrollTrigger.getAll().forEach(s => s.kill())
  }, [])

  return (
    <footer className="ft-footer" ref={footerRef}>

      {/* Top glow line */}
      <div className="ft-glow-line" aria-hidden />

      <div className="ft-inner">

        {/* ── LEFT: Shopian logo ── */}
        <div className="ft-logo">
          <span className="ft-logo-icon">🛍</span>
          <span className="ft-logo-text">Shopian</span>
        </div>

        {/* ── CENTER: tagline + social ── */}
        <div className="ft-center">
          <p className="ft-tagline">Una solución de Softian Solutions.</p>

          <div className="ft-social">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ft-social-btn"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Softian Solutions ── */}
        <div className="ft-softian">
          <div className="ft-softian-icon">S</div>
          <div className="ft-softian-text">
            <span className="ft-softian-name">Softian</span>
            <span className="ft-softian-sub">SOLUTIONS</span>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <span>© 2025 Shopian · Todos los derechos reservados</span>
        <span className="ft-bottom-sep">·</span>
        <a href="#" className="ft-bottom-link">Privacidad</a>
        <span className="ft-bottom-sep">·</span>
        <a href="#" className="ft-bottom-link">Términos</a>
      </div>

    </footer>
  )
}
