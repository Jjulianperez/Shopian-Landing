import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SoftianLogo   from "../../assets/logoSoftian.png"
import ShopianLogo   from "../../assets/LogoShopian.png"
import ShopianFirma  from "../../assets/firmaShopian.png"
import "./Footer.css"

gsap.registerPlugin(ScrollTrigger)

const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:5174"

const NAV_LINKS = [
  { label: "Funciones", href: "#features" },
  { label: "Precios",   href: "#pricing"  },
  { label: "FAQ",       href: "#faq"      },
]

const APP_LINKS = [
  { label: "Crear tienda", href: `${APP_URL}/register` },
  { label: "Ingresar",     href: `${APP_URL}/login`    },
]

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/softian.solutions/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current!
    const st = { trigger: footer, start: "top 92%", toggleActions: "play none none none" }

    gsap.fromTo(footer.querySelectorAll(".ft-col"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out", scrollTrigger: st }
    )

    return () => ScrollTrigger.getAll().forEach(s => s.kill())
  }, [])

  return (
    <footer className="ft-footer" ref={footerRef}>

      {/* Top rainbow glow line */}
      <div className="ft-glow-line" aria-hidden />

      <div className="ft-inner">

        {/* ── COL 1: Shopian brand ── */}
        <div className="ft-col ft-col--brand">
          <a href="#" className="ft-brand-logo">
            <img src={ShopianLogo}  alt="" className="ft-brand-icon" loading="lazy" decoding="async" />
            <img src={ShopianFirma} alt="Shopian" className="ft-brand-name" loading="lazy" decoding="async" />
          </a>
          <p className="ft-brand-desc">
            Convertí tu WhatsApp en una máquina de ventas. Catálogo profesional, pedidos automáticos y estadísticas, en un solo lugar.
          </p>
          <div className="ft-social">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ft-social-btn"
                aria-label={s.label}
                title={s.label}
                target="_blank"
                rel="noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── COL 2: Navegación ── */}
        <div className="ft-col">
          <p className="ft-col-title">Producto</p>
          <ul className="ft-link-list">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="ft-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COL 3: App ── */}
        <div className="ft-col">
          <p className="ft-col-title">Cuenta</p>
          <ul className="ft-link-list">
            {APP_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="ft-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COL 4: Softian Solutions ── */}
        <div className="ft-col ft-col--softian">
          <p className="ft-col-title">Desarrollado por</p>
          <a
            href="https://softian.solutions"
            target="_blank"
            rel="noreferrer"
            className="ft-softian-link"
          >
            <img src={SoftianLogo} alt="Softian Solutions" className="ft-softian-logo" loading="lazy" decoding="async" />
            <div className="ft-softian-text">
              <span className="ft-softian-name">Softian</span>
              <span className="ft-softian-sub">SOLUTIONS</span>
            </div>
          </a>
          <p className="ft-softian-desc">
            Soluciones digitales para emprendedores y pequeñas empresas.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <span>© 2026 Shopian · Todos los derechos reservados</span>
        <div className="ft-bottom-links">
          <a href="#" className="ft-bottom-link">Privacidad</a>
          <span className="ft-bottom-sep">·</span>
          <a href="#" className="ft-bottom-link">Términos</a>
        </div>
      </div>

    </footer>
  )
}
