// src/components/About.jsx
import React from 'react';
import { motion, useInView } from 'framer-motion';
import './styles/about.scss';

const About = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="section-title">
        <h2>About</h2>
        <div className="underline" />
        <p>
          Passionate full-stack developer crafting digital experiences with modern technologies
        </p>
      </div>

      <div className="about-content">
        <div className="about-info">
          <div className="role-badge">
            <motion.span 
              className="badge javascript"
              initial={{ y: -150, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            >
              JavaScript
            </motion.span>
            <motion.span 
              className="badge react"
              initial={{ y: -150, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            >
              React
            </motion.span>
            <motion.span 
              className="badge node"
              initial={{ y: -150, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
            >
              Node.js
            </motion.span>
            <motion.span 
              className="badge express"
              initial={{ y: -150, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            >
              Express.js
            </motion.span>
          </div>

          <h3>Full-Stack Web Developer & JavaScript Enthusiast</h3>

          <p className="about-tagline">
            I transform ideas into interactive web applications, specializing in React ecosystem
            and modern JavaScript development. With a strong foundation in both frontend and backend,
            I create seamless user experiences from concept to deployment.
          </p>

          <motion.div 
            className="details-grid"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            style={{ transformOrigin: "left" }}
          >
            <ul>
              <li><strong>Birthday:</strong> <span>25 April 1998</span></li>
              <li><strong>Website:</strong> <span>www.learnjavascript.in/</span></li>
              <li><strong>Phone:</strong> <span>+91 6350431551</span></li>
              <li><strong>City:</strong> <span>Jaipur, Rajasthan</span></li>
            </ul>
            <ul>
              <li><strong>Age:</strong> <span>26</span></li>
              <li><strong>Degree:</strong> <span>B. Tech</span></li>
              <li><strong>Email:</strong> <span>nehranvl2017@gmail.com</span></li>
              <li><strong>Experience:</strong> <span>3+ Years</span></li>
            </ul>
          </motion.div>

          <div className="skills-showcase">
            <div className="skill-category">
              <h4>🚀 Frontend Expertise</h4>
              <p>React.js, JavaScript (ES6+), TypeScript, Redux, Next.js, HTML5, CSS3/Sass</p>
            </div>
            <div className="skill-category">
              <h4>⚙️ Backend Development</h4>
              <p>Node.js, Express.js, RESTful APIs, Database Design, Authentication & Authorization</p>
            </div>
            <div className="skill-category">
              <h4>🛠️ Tools & Technologies</h4>
              <p>Git, Docker, MongoDB, Jest, Webpack</p>
            </div>
          </div>

          <p className="about-bottom">
            I believe in writing clean, maintainable code and staying updated with the latest
            industry trends. When I'm not coding, you'll find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
