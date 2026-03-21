// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.scss';
import { LinkedIn, GitHub, LeetCode, Twitter, Instagram } from '../utils/constants';
import profileImage from '../assets/profile.jpg';

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle navigation
    const handleNavigation = (path, sectionId = null) => {
        if (path === '/post') {
            navigate('/post');
        } else {
            if (location.pathname === '/') {
                scrollToSection(sectionId);
                setActiveSection(sectionId);
            } else {
                navigate('/');
                if (sectionId) {
                    setTimeout(() => {
                        scrollToSection(sectionId);
                        setActiveSection(sectionId);
                    }, 2100); 
                }
            }
        }
        setIsMobileMenuOpen(false);
    };

    // Smooth scroll function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                const elementTop = element.offsetTop;
                mainContent.scrollTo({
                    top: elementTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // The Bulletproof Scroll Tracker
    useEffect(() => {
        if (location.pathname === '/post') {
            setActiveSection('posts');
            return;
        }

        let ticking = false;

        const handleGlobalScroll = (e) => {
            const target = e.target;
            
            // Only react if the element scrolling is our main content area
            if (target && target.classList && target.classList.contains('main-content')) {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const sections = ['hero', 'about', 'skills', 'resume', 'portfolio', 'contact'];
                        
                        // 1. Edge Case: Did we hit the absolute bottom of the scroll container?
                        const isAtBottom = Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight - 50;
                        
                        if (isAtBottom) {
                            setActiveSection('contact'); // Force last section
                        } else {
                            // 2. Standard Viewport Math
                            let current = sections[0];
                            for (const id of sections) {
                                const element = document.getElementById(id);
                                if (element) {
                                    const rect = element.getBoundingClientRect();
                                    // If the top of the section enters the top 40% of the viewport window
                                    if (rect.top <= window.innerHeight * 0.4) {
                                        current = id;
                                    }
                                }
                            }
                            setActiveSection(current);
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            }
        };

        // The Magic Trick: 'true' enables the Capture Phase. 
        // This catches scroll events on .main-content even if it renders late!
        window.addEventListener('scroll', handleGlobalScroll, true);

        // Run an initial check after the 2-second loading screen finishes
        const initialCheckTimer = setTimeout(() => {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                // Manually trigger the check once it exists
                handleGlobalScroll({ target: mainContent }); 
            }
        }, 2100);

        return () => {
            window.removeEventListener('scroll', handleGlobalScroll, true);
            clearTimeout(initialCheckTimer);
        };
    }, [location.pathname]);

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
                                    handleNavigation('/', 'hero');
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
                                    handleNavigation('/', 'about');
                                }}
                            >
                                <i className="bi bi-person"></i> <span>About</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#skills" 
                                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation('/', 'skills');
                                }}
                            >
                                <i className="bi bi-person"></i> <span>Skills</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#resume" 
                                className={`nav-link ${activeSection === 'resume' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation('/', 'resume');
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
                                    handleNavigation('/', 'portfolio');
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
                                    handleNavigation('/', 'contact');
                                }}
                            >
                                <i className="bi bi-envelope"></i> <span>Contact</span>
                            </a>
                        </li>
                        
                        {/* This component should be at bottom of the sidebar */}
                        <li>
                            <a 
                                href="/post" 
                                className={`nav-link ${activeSection === 'posts' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation('/post');
                                }}
                            >
                                <i className="bi bi-journal-text"></i> <span>Posts</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;