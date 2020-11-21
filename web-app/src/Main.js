import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Navbar.js"
import Section from "./Section.js"
import Footer from "./Footer"

const Main = () =>{
  return(
    <>
      <Router>        
        
        <div style={{}}>
          <NavBar/>
          <div style={{marginTop: "2%", marginBottom: "3%"}}>
            <Section/>
          </div>
          <Footer/>
        </div>
        
      </Router>
    </>
  )
}

export default Main