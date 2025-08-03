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
            // Check if we're already on the main page
            if (location.pathname === '/') {
                // Already on main page, just scroll to section
                scrollToSection(sectionId);
                // Immediately set the active section
                setActiveSection(sectionId);
            } else {
                // Coming from /post, navigate and then scroll after delay
                navigate('/');
                if (sectionId) {
                    setTimeout(() => {
                        scrollToSection(sectionId);
                        setActiveSection(sectionId);
                    }, 100); // Reduced delay
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
            const elementTop = element.offsetTop;
            mainContent.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    };

    // Improved scroll detection function
    const handleScroll = () => {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;

        const sections = ['hero', 'about', 'resume', 'portfolio', 'contact'];
        const scrollTop = mainContent.scrollTop;
        const viewportHeight = mainContent.clientHeight;

        // Find which section is currently in view
        let currentSection = 'hero';
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const sectionTop = section.offsetTop;
                
                // Check if section is in viewport (more precise detection)
                if (scrollTop >= sectionTop - viewportHeight * 0.3) {
                    currentSection = sections[i];
                    break;
                }
            }
        }
        
        setActiveSection(currentSection);
    };

    // Update active section based on route and scroll position
    useEffect(() => {
        if (location.pathname === '/post') {
            setActiveSection('posts');
        } else {
            // Set up scroll listener for home page
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                // Initial check for current section
                handleScroll();
                
                // Add scroll event listener with throttling
                let ticking = false;
                const throttledHandleScroll = () => {
                    if (!ticking) {
                        requestAnimationFrame(() => {
                            handleScroll();
                            ticking = false;
                        });
                        ticking = true;
                    }
                };
                
                mainContent.addEventListener('scroll', throttledHandleScroll);
                
                // Cleanup function
                return () => {
                    mainContent.removeEventListener('scroll', throttledHandleScroll);
                };
            }
        }
    }, [location.pathname]);

    // Remove the additional effect that was causing timing issues
    // The scroll detection will handle itself properly now

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
