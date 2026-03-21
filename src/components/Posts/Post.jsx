import React, { useState, useEffect, Suspense, lazy } from 'react';
import '../../styles/posts.scss';
import NavigationLoading from '../NavigationLoading';

// Lazy load the actual posts content
const PostsContent = lazy(() => import('./PostsContent'));

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 97) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
          return 100;
        }
        return Math.min(100, prev + Math.random() * 8); // Random increment for realistic loading
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <NavigationLoading
      progress={progress}
      info={`Collecting data from backend... ${Math.round(progress)}%`}
    />;
  }


  return (
    <div className="posts-container">
      <Suspense fallback={
        <NavigationLoading
          progress={progress}
          info={`Collecting data from backend... ${Math.round(progress)}%`}
        />
      }>
        <PostsContent />
      </Suspense>
    </div>
  );
};

export default Post;
