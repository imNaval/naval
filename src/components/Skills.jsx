import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import "./styles/skills.scss"; // Adjust the path as necessary
import skillsData from "../utils/skills.json";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 }); // 30% visible triggers

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="section-title">
        <h2>Skills</h2>
        <div className="underline" />
        <p>
          Mastering the art of web development through continuous learning and hands-on experience. 
          From frontend finesse to backend brilliance, I bring ideas to life with precision and creativity.
        </p>
      </div>

      <div className="skills-grid">
        {skillsData.skills.map((skill) => (
          <div className="skill-bar" key={skill.id}>
            <div className="skill-header">
              <span>{skill.name}</span>
              <span>{skill.percent}%</span>
            </div>
            <div className="progress-bg">
              <motion.div
                className="progress-fill"
                initial="hidden"
                animate={controls}
                variants={{
                  visible: {
                    width: `${skill.percent}%`,
                    transition: {
                      duration: 1.5,
                      ease: "easeOut",
                      delay: skill.id * 0.1,
                    },
                  },
                  hidden: {
                    width: 0,
                    transition: { duration: 0.3 },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
