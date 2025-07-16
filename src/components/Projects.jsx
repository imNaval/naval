import { useRef, useState, useEffect } from "react";
import "./styles/projects.scss";
import { projects } from "../utils/projects";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Project = ({ item }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  
  // State for image carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Auto-change images when hovering
  useEffect(() => {
    if (!isHovering || !item.images || item.images.length <= 1) return;
    
    // Start immediately on hover
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    }, 500); // Start first change after 500ms
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    }, 4000); // Change image every 4 seconds
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isHovering, item.images]);

  return (
    <section className="project-section" ref={ref}>
      <motion.div style={{ y }} className="project-wrapper">
        <div 
          className="imgContainer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              alt={`project-image-${currentImageIndex + 1}`}
              src={item.images[currentImageIndex]}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut"
              }}
              style={{
                transformOrigin: "left center"
              }}
            />
          </AnimatePresence>
        </div>
        <div className="textContainer">
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <button>See Live</button>
        </div>
      </motion.div>
    </section>
  );
};

const Projects = ({ mainContentRef }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Progress starts when Projects enters viewport, ends when Projects leaves viewport
    container: mainContentRef, // Track scroll within MainContent container
  });

  // Custom transform for center expansion
  const progressTransform = useTransform(scrollYProgress, [0, 1], [
    "translateX(-50%) scaleX(1)",
    "translateX(-50%) scaleX(0)"
  ]);

  return (
    <div className="projects" id="portfolio" ref={containerRef}>
      <div className="project-header">
        <div className="title">
          <h1>Featured Works</h1>
        </div>
        <div className="progressBarWrapper">
          <motion.div className="progressBar" style={{ transform: progressTransform }} />
        </div>
      </div>

      <div className="projects-section">
      {projects.map((project) => (
        <Project key={project.id} item={project} />
      ))}
      </div>
    </div>
  );
};

export default Projects;
