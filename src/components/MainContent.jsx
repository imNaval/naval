// src/components/MainContent.jsx
import { forwardRef } from 'react';
import './styles/mainContent.scss';

const MainContent = forwardRef(({ children }, ref) => {
  return <main className="main-content" ref={ref}>{children}</main>;
});

export default MainContent;
