import React from 'react';
import './styles/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">© 2024 Naval. All rights reserved.</p>
        <a 
          href="https://naval-portfolio.vercel.app" 
          className="website-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          naval-portfolio.vercel.app
        </a>
      </div>
    </footer>
  );
};

export default Footer; 