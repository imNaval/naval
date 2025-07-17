import "./styles/hero.scss"
import { useEffect } from "react"
import { downloadResume } from "../utils/functionality"
import { CONTACT_EMAIL } from "../utils/constants"

const Hero = () => {
  useEffect(() => {
    const hireMeButton = document.getElementById('hireMeButton');
    const cvButton = document.getElementById('cvButton');

    if (hireMeButton) {
      hireMeButton.addEventListener('mouseenter', () => {
        hireMeButton.style.backgroundColor = 'transparent';
        hireMeButton.style.transform = 'translateY(-2px)';
      });
      hireMeButton.addEventListener('mouseleave', () => {
        hireMeButton.style.backgroundColor = 'orange';
        hireMeButton.style.transform = 'translateY(0)';
      });
    }

    if (cvButton) {
      cvButton.addEventListener('mouseenter', () => {
        cvButton.style.backgroundColor = 'orange';
        cvButton.style.transform = 'translateY(-2px)';
      });
      cvButton.addEventListener('mouseleave', () => {
        cvButton.style.backgroundColor = 'transparent';
        cvButton.style.transform = 'translateY(0)';
      });
    }
  }, []);

  const handleHireMeClick = () => {
    const email = CONTACT_EMAIL; // Using environment variable
    const subject = 'Hiring Inquiry - Web Developer Position';
    const body = 'Hello Naval,\n\nI am interested in discussing a potential collaboration or hiring opportunity with you.\n\nBest regards,';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className='hero' id="hero">
        <div className="wrapper">
            <div className="imageContainer">
                <img src="./hero.png" alt="hero" />
            </div>
            <div className="introContainer">
                <h2>Naval Nehra</h2>
                <h1>Web Developer | React Developer</h1>
                <div className="buttons">
                    <button 
                        id="hireMeButton"
                        style={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={handleHireMeClick}
                    >
                        HIRE ME
                    </button>
                    <button 
                        id="cvButton"
                        style={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={downloadResume}
                    >
                        GET CV
                    </button>
                </div>
                <img src="./scroll.png" alt="scroll" />
            </div>

            <div className="slidingTextContainer">
                JavaScript | React | Node | Web Development
            </div>
        </div>
    </div>
  )
}

export default Hero