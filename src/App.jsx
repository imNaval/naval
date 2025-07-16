// import { useState } from 'react'
import { useRef } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const mainContentRef = useRef(null);

  return (
    <main className="app">
      <Sidebar />
      <MainContent ref={mainContentRef}>
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Projects mainContentRef={mainContentRef} />
        <Contact />
        <Footer />
        {/* Add other components here */}
      </MainContent>
    </main>
  )
}

export default App
