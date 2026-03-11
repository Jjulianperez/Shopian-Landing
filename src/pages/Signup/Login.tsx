import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import "./Login.css"

// ── Google icon ──────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
)

// ── Apple icon ───────────────────────────────
const AppleIcon = ({ dark }: { dark: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 814 1000" fill={dark ? "#fff" : "#000"}>
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 680.5-.5 605.7-.5 534.8c0-159.2 105-243.5 208.1-243.5 55.2 0 101.6 37.1 137.1 37.1 33.5 0 85.5-39.3 148.8-39.3 26.5 0 108.2 2.6 168.1 79.1zm-147.2-147.2c-6.5 27.9-20.1 55.2-39 75.4-25.1 27.9-58.2 46.4-90.3 46.4-5.1 0-9.7-.6-13.5-1.3-.6-3.9-.6-7.8-.6-12.4 0-26.5 12.4-53.7 30.9-72.8 19.5-20.1 51-35.1 78.2-37.1 4.5 0 9-.6 13.5-.6.6 0 1.2 0 1.2.6.6 0 1.3.6 1.3 1.8z"/>
  </svg>
)

export default function Login() {
  const [dark, setDark]       = useState(true)
  const [email, setEmail]     = useState("")
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  const cardRef    = useRef<HTMLDivElement>(null)
  const toggleRef  = useRef<HTMLButtonElement>(null)

  // Mount entrance animation
  useEffect(() => {
    const card = cardRef.current!
    gsap.fromTo(card,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" }
    )
  }, [])

  // Theme switch animation
  const handleTheme = () => {
    const card = cardRef.current!
    gsap.to(card, {
      scale: 0.98, opacity: 0.7, duration: 0.15, ease: "power2.in",
      onComplete: () => {
        setDark(d => !d)
        gsap.to(card, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" })
      }
    })
  }

  const handleContinue = () => {
    if (!email) return
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div className={`login-root ${dark ? "dark" : "light"}`}>

      {/* Background glows — dark mode only */}
      {dark && (
        <>
          <div className="login-glow login-glow--1" />
          <div className="login-glow login-glow--2" />
        </>
      )}

      {/* Top bar */}
      <div className="login-topbar">
        <span className="login-topbar-title">Sign In</span>
        <button
          className="login-theme-btn"
          ref={toggleRef}
          onClick={handleTheme}
          aria-label="Toggle theme"
        >
          {dark ? (
            // Sun icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            // Moon icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Card */}
      <div className="login-card" ref={cardRef}>

        {/* Logo */}
        <div className="login-logo-wrap">
          <div className="login-logo-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="url(#logoGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6" stroke="url(#logoGrad)" strokeWidth="1.8"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="url(#logoGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00f2ff"/>
                  <stop offset="100%" stopColor="#cc00ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="login-brand">Shopian</span>
        </div>

        {/* Heading */}
        <h1 className="login-heading">Crea una cuenta</h1>
        <p className="login-subheading">
          Ingresa tu correo electrónico<br/>
          para registrarte en esta aplicación
        </p>

        {/* Email input */}
        <div className={`login-input-wrap ${focused ? "focused" : ""}`}>
          <input
            type="email"
            className="login-input"
            placeholder="user@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {/* Continue button */}
        <button
          className={`login-btn-primary ${loading ? "loading" : ""}`}
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <span className="login-spinner" />
          ) : (
            "Continuar"
          )}
        </button>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">o</span>
          <span className="login-divider-line" />
        </div>

        {/* OAuth buttons */}
        <button className="login-oauth-btn">
          <GoogleIcon />
          <span>Continuar con Google</span>
        </button>

        <button className="login-oauth-btn">
          <AppleIcon dark={dark} />
          <span>Continuar con Apple</span>
        </button>

        {/* Legal */}
        <p className="login-legal">
          Al hacer clic en continuar, aceptas nuestros{" "}
          <a href="#" className="login-legal-link">Términos de servicio</a>
          {" "}y{" "}
          <a href="#" className="login-legal-link">Política de privacidad</a>
        </p>

      </div>
    </div>
  )
}
