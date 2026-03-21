// import { useState, useEffect } from 'react';
import '../styles/navigationLoading.scss'; 

const NavigationLoading = ({ progress = 0, info }) => {
  const pct = Number(progress) || 0;

  return (
    <div className="posts-loading-container">
      <div className="loading-content">
        <div className="loading-animation">
          
          <div className="data-collection">
            <div className="data-points">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className={`data-point ${pct > i * 5 ? 'collected' : ''}`}
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
            {/* Sleek CSS Runner synced with progress */}
            <div 
              className="modern-runner-wrapper" 
              style={{ left: `${pct}%` }}
            >
              <div className="modern-runner">
                <div className="r-head"></div>
                <div className="r-torso"></div>
                <div className="r-arms">
                  <div className="r-arm r-arm-left"></div>
                  <div className="r-arm r-arm-right"></div>
                </div>
                <div className="r-legs">
                  <div className="r-leg r-leg-left"></div>
                  <div className="r-leg r-leg-right"></div>
                </div>
              </div>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${pct}%` }}
              ></div>
            </div>
            <div className="progress-text">
            {info || `Loading... ${Math.round(pct)}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationLoading;