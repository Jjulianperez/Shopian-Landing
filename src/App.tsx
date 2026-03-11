import "./styles/global.css"

import Navbar from "./components/NavBar/NavBar"
import Hero from "./components/Hero/Hero"
import Timeline from "./components/Timeline/Timeline"
import Cards from "./components/Cards/Cards"
import Steps from "./components/Steps/Steps"
import CTA from "./components/CTA/CTA"
import Footer from "./components/Footer/Footer"
import Login from "./pages/Signup/Login"

function App() {
  return (

    <div style={{maxWidth:430, margin:"0 auto"}}>

      <Navbar/>

      <Hero/>

      <Cards/>
      <Timeline/>
      <Steps/>
      <CTA/>

      <Footer/>
      <Login/>
    </div>

  )
}

export default App