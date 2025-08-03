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

// Loading component for navigation
const NavigationLoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="posts-loading-container">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="man-container">
            <div className="man">
              <div className="head"></div>
              <div className="body"></div>
              <div className="arms">
                <div className="arm left"></div>
                <div className="arm right"></div>
              </div>
              <div className="legs">
                <div className="leg left"></div>
                <div className="leg right"></div>
              </div>
            </div>
          </div>
          
          <div className="data-collection">
            <div className="data-points">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className={`data-point ${progress > i * 5 ? 'collected' : ''}`}
                  style={{ 
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Loading content... {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App content component
const AppContent = () => {
  const mainContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading when navigating from /post to other routes
    if (location.pathname !== '/post') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Show loading for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (isLoading) {
    return <NavigationLoading />;
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
