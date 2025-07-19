import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/resume.scss'; // Import the styles for the Resume component
import { resumeData } from '../utils/resumeData';

const Resume = () => {
  // Separate refs for each subsection
  const summaryRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const certificationsRef = useRef(null);
  const skillsRef = useRef(null);

  // Separate viewport detection for each section
  const summaryInView = useInView(summaryRef, { margin: "-50px" });
  const experienceInView = useInView(experienceRef, { margin: "-50px" });
  const educationInView = useInView(educationRef, { margin: "-50px" });
  const certificationsInView = useInView(certificationsRef, { margin: "-50px" });
  const skillsInView = useInView(skillsRef, { margin: "-50px" });

  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <p className="section-description">
          Experienced software engineer with expertise in React.js and full-stack development. 
          Passionate about creating innovative web solutions and AI-powered applications.
        </p>

        <div className="resume-content">
          {/* Left Column */}
          <div className="resume-column">
            {/* Summary */}
            <div className="resume-block" ref={summaryRef}>
              <h3 className="resume-block-title">Summary</h3>
              <div className="vertical-line">
                <motion.div 
                  className="line-segment"
                  initial={{ height: 0 }}
                  animate={summaryInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="resume-block-content with-line">
                  <motion.div 
                    className="circle" 
                    initial={{ y: 100, opacity: 0 }}
                    animate={summaryInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  />
                  <h4>{resumeData.summary.name}</h4>
                  <h5>{resumeData.summary.title}</h5>
                  <p>
                    <em>{resumeData.summary.description}</em>
                  </p>
                  <ul>
                    <li>{resumeData.summary.contact.location}</li>
                    <li>{resumeData.summary.contact.phone}</li>
                    <li>{resumeData.summary.contact.email}</li>
                    <li>{resumeData.summary.contact.website}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="resume-block" ref={educationRef}>
              <h3 className="resume-block-title">Education</h3>
              <div className="vertical-line">
                <motion.div 
                  className="line-segment"
                  initial={{ height: 0 }}
                  animate={educationInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
                {resumeData.education.map((edu, index) => (
                  <div className="resume-block-content with-line" key={edu.id}>
                    <motion.div 
                      className="circle" 
                      initial={{ y: 100, opacity: 0 }}
                      animate={educationInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 + index * 0.3 }}
                    />
                    <h4>{edu.degree} in {edu.field}</h4>
                    <h5>{edu.year}</h5>
                    <p>
                      <em>{edu.institution}, {edu.location}</em>
                    </p>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="resume-block" ref={certificationsRef}>
              <h3 className="resume-block-title">Certifications</h3>
              <div className="vertical-line">
                <motion.div 
                  className="line-segment"
                  initial={{ height: 0 }}
                  animate={certificationsInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
                {resumeData.certifications.map((cert, index) => (
                  <div className="resume-block-content with-line" key={cert.id}>
                    <motion.div 
                      className="circle" 
                      initial={{ y: 100, opacity: 0 }}
                      animate={certificationsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 + index * 0.3 }}
                    />
                    <div className="certification-content">
                      <div className="cert-info">
                        <h4>{cert.name}</h4>
                        <h5>{cert.year}</h5>
                        <p>
                          <em>{cert.issuer}</em>
                        </p>
                      </div>
                      {cert.image && (
                        <div className="cert-image">
                          <motion.img 
                            src={cert.image} 
                            alt={`${cert.name} certificate`}
                            whileHover={{ 
                              scale: 1.1,
                              rotateY: 5,
                              boxShadow: "0 8px 25px rgba(0, 212, 255, 0.3)"
                            }}
                            transition={{ 
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="resume-column">
            <div className="resume-block" ref={experienceRef}>
              <h3 className="resume-block-title">Professional Experience</h3>
              <div className="vertical-line">
                <motion.div 
                  className="line-segment"
                  initial={{ height: 0 }}
                  animate={experienceInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
                {resumeData.experience.map((exp, index) => (
                  <div className="resume-block-content with-line" key={exp.id}>
                    <motion.div 
                      className="circle" 
                      initial={{ y: 100, opacity: 0 }}
                      animate={experienceInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 + index * 0.4 }}
                    />
                    <h4>{exp.position}</h4>
                    <h5>{exp.duration}</h5>
                    <p>
                      <em>{exp.company}, {exp.location}</em>
                    </p>
                    <ul>
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="resume-block" ref={skillsRef}>
              <h3 className="resume-block-title">Skills</h3>
              <div className="vertical-line">
                <motion.div 
                  className="line-segment"
                  initial={{ height: 0 }}
                  animate={skillsInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="resume-block-content with-line">
                  <motion.div 
                    className="circle" 
                    initial={{ y: 100, opacity: 0 }}
                    animate={skillsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
                  />
                  <h4>Technical Skills</h4>
                  <div className="skills-tags">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span className="skill-tag" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="resume-block-content with-line">
                  <motion.div 
                    className="circle" 
                    initial={{ y: 100, opacity: 0 }}
                    animate={skillsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
                  />
                  <h4>Tools & Technologies</h4>
                  <div className="skills-tags">
                    {resumeData.skills.tools.map((skill, index) => (
                      <span className="skill-tag secondary" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="resume-block-content with-line">
                  <motion.div 
                    className="circle" 
                    initial={{ y: 100, opacity: 0 }}
                    animate={skillsInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 1.1 }}
                  />
                  <h4>Soft Skills</h4>
                  <div className="skills-tags">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span className="skill-tag soft" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
