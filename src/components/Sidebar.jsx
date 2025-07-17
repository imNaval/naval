// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import '../styles/sidebar.scss';
import { LinkedIn, GitHub, LeetCode, Twitter, Instagram } from '../utils/constants';
import profileImage from '../assets/profile.jpg';

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Smooth scroll function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const mainContent = document.querySelector('.main-content');
            const elementTop = element.offsetTop;
            mainContent.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
            // Close mobile menu after navigation
            setIsMobileMenuOpen(false);
        }
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const mainContent = document.querySelector('.main-content');
            if (!mainContent) return;

            const sections = ['hero', 'about', 'resume', 'portfolio', 'contact'];
            const scrollTop = mainContent.scrollTop;

            // Find which section is currently in view
            let currentSection = 'hero';
            
            for (let i = 0; i < sections.length; i++) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const sectionTop = section.offsetTop;
                    
                    // Very aggressive detection - activate section when it's 300px into viewport
                    if (scrollTop >= sectionTop - 300) {
                        currentSection = sections[i];
                    }
                }
            }
            
            setActiveSection(currentSection);
        };

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.addEventListener('scroll', handleScroll);
            return () => mainContent.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.sidebar') && !event.target.closest('.mobile-menu-toggle')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="profile">
                    <div className="profile-image">
                        <img src={profileImage} alt="Naval Nehra" />
                    </div>
                    <h1>Naval Nehra</h1>
                    <div className="social-links">
                        <a href={LinkedIn} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href={GitHub} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-github"></i>
                        </a>
                        <a href={LeetCode} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-code-square"></i>
                        </a>
                        <a href={Twitter} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href={Instagram} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>

                <nav className="nav-menu">
                    <ul>
                        <li>
                            <a 
                                href="#hero" 
                                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('hero');
                                }}
                            >
                                <i className="bi bi-house-door"></i> <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#about" 
                                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('about');
                                }}
                            >
                                <i className="bi bi-person"></i> <span>About</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#resume" 
                                className={`nav-link ${activeSection === 'resume' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('resume');
                                }}
                            >
                                <i className="bi bi-file-earmark-text"></i> <span>Resume</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#portfolio" 
                                className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('portfolio');
                                }}
                            >
                                <i className="bi bi-grid-3x3-gap"></i> <span>Portfolio</span>
                            </a>
                        </li>
                        
                        <li>
                            <a 
                                href="#contact" 
                                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('contact');
                                }}
                            >
                                <i className="bi bi-envelope"></i> <span>Contact</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
