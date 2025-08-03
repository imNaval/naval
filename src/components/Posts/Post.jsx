import React, { useState, useEffect, Suspense, lazy } from 'react';
import '../../styles/posts.scss';

// Lazy load the actual posts content
const PostsContent = lazy(() => import('./PostsContent'));

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic loading
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="posts-loading-container">
        <div className="loading-content">
          <div className="loading-animation">
            <div className="man-container">
              <div className="man">
                <div className="head"></div>
                <div className="body"></div>
                <div className="arms">
                  <div className="arm left"></div>
                  <div className="arm right"></div>
                </div>
                <div className="legs">
                  <div className="leg left"></div>
                  <div className="leg right"></div>
                </div>
              </div>
            </div>
            
            <div className="data-collection">
              <div className="data-points">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`data-point ${progress > i * 5 ? 'collected' : ''}`}
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
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Collecting data from backend... {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <Suspense fallback={<div className="posts-fallback">Loading posts...</div>}>
        <PostsContent />
      </Suspense>
    </div>
  );
};

export default Post;
