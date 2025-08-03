import React from 'react';

const PostsContent = () => {
  // Simulate large amount of posts data
  const posts = [
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt: "React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore the fundamentals of React development...",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns for Modern Applications",
      excerpt: "Understanding advanced JavaScript patterns is crucial for building scalable applications. Let's dive deep into closures, prototypes, and more...",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "JavaScript",
      tags: ["JavaScript", "ES6+", "Patterns"]
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Learn when and how to use each effectively...",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "CSS",
      tags: ["CSS", "Grid", "Flexbox", "Layout"]
    },
    {
      id: 4,
      title: "Building RESTful APIs with Node.js and Express",
      excerpt: "Create robust and scalable APIs using Node.js and Express. We'll cover authentication, validation, error handling, and best practices...",
      date: "2023-12-28",
      readTime: "15 min read",
      category: "Backend",
      tags: ["Node.js", "Express", "API", "Backend"]
    },
    {
      id: 5,
      title: "State Management in React: Redux vs Context API",
      excerpt: "Choosing the right state management solution is crucial for React applications. Let's compare Redux and Context API with real-world examples...",
      date: "2023-12-20",
      readTime: "14 min read",
      category: "React",
      tags: ["React", "Redux", "Context API", "State Management"]
    },
    {
      id: 6,
      title: "Performance Optimization Techniques for Web Applications",
      excerpt: "Learn essential techniques to optimize your web applications for better performance, including code splitting, lazy loading, and caching strategies...",
      date: "2023-12-15",
      readTime: "18 min read",
      category: "Performance",
      tags: ["Performance", "Optimization", "Web Development"]
    },
    {
      id: 7,
      title: "TypeScript Best Practices for Large Projects",
      excerpt: "TypeScript can significantly improve code quality and developer experience. Discover best practices for using TypeScript in large-scale projects...",
      date: "2023-12-10",
      readTime: "16 min read",
      category: "TypeScript",
      tags: ["TypeScript", "Best Practices", "Large Projects"]
    },
    {
      id: 8,
      title: "Testing React Components with Jest and React Testing Library",
      excerpt: "Comprehensive testing is essential for maintaining code quality. Learn how to effectively test React components using modern testing tools...",
      date: "2023-12-05",
      readTime: "13 min read",
      category: "Testing",
      tags: ["Testing", "Jest", "React Testing Library", "React"]
    },
    {
      id: 9,
      title: "Modern CSS Techniques: Custom Properties and CSS-in-JS",
      excerpt: "Explore modern CSS techniques including CSS custom properties, CSS-in-JS solutions, and how they can improve your styling workflow...",
      date: "2023-11-30",
      readTime: "11 min read",
      category: "CSS",
      tags: ["CSS", "Custom Properties", "CSS-in-JS", "Styling"]
    },
    {
      id: 10,
      title: "Building Progressive Web Apps (PWAs)",
      excerpt: "Progressive Web Apps combine the best of web and mobile apps. Learn how to build PWAs with offline functionality, push notifications, and more...",
      date: "2023-11-25",
      readTime: "20 min read",
      category: "PWA",
      tags: ["PWA", "Progressive Web Apps", "Offline", "Service Workers"]
    }
  ];

  return (
    <div className="posts-content">
      <div className="posts-header">
        <h1>My Blog Posts</h1>
        <p>Thoughts, tutorials, and insights about web development</p>
      </div>
      
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <span className="post-category">{post.category}</span>
              <span className="post-date">{post.date}</span>
            </div>
            
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            
            <div className="post-meta">
              <span className="read-time">{post.readTime}</span>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <button className="read-more-btn">Read More</button>
          </article>
        ))}
      </div>
      
      <div className="posts-footer">
        <p>More posts coming soon...</p>
      </div>
    </div>
  );
};

export default PostsContent; 