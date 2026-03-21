import { useRef, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import Post from './components/Posts/Post'
import NavigationLoading from './components/NavigationLoading'


const AppContent = () => {
  const mainContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress bar
    if (location.pathname !== '/post') {
      setIsLoading(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
            return 100;
          }
          return Math.min(100, prev + Math.random() * 20); // Random increment for realistic loading
        });
      }, 200);

      return () => clearInterval(interval);
    }
    else{
      setProgress(50)
    }
  }, [location.pathname]);

  if (isLoading) {
    return <NavigationLoading
      progress={progress}
      info="Loading content..."
    />;
  }

  return (
    <Routes>
      <Route path="/" element={
        <MainContent ref={mainContentRef}>
          <Hero />
          <About />
          <Skills />
          <Resume />
          <Projects mainContentRef={mainContentRef} />
          <Contact />
          <Footer />
        </MainContent>
      } />
      <Route path="/post" element={<Post />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <main className="app">
        <Sidebar />
        <AppContent />
      </main>
    </Router>
  )
}

export default App
