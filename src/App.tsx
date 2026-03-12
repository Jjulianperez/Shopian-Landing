import { Suspense, lazy } from "react"
import "./styles/global.css"

import Navbar from "./components/NavBar/NavBar"
import Hero   from "./components/Hero/Hero"

// Below-fold components — loaded only when needed
const Cards    = lazy(() => import("./components/Cards/Cards"))
const Timeline = lazy(() => import("./components/Timeline/Timeline"))
const Steps    = lazy(() => import("./components/Steps/Steps"))
const Pricing  = lazy(() => import("./components/Pricing/Pricing"))
const FAQ      = lazy(() => import("./components/FAQ/FAQ"))
const CTA      = lazy(() => import("./components/CTA/CTA"))
const Footer   = lazy(() => import("./components/Footer/Footer"))

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Cards />
        <Timeline />
        <Steps />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
