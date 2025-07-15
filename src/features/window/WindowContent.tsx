import React from 'react';

interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}

const WindowContent: React.FC<WindowContentProps> = ({
  children,
  className = '',
  scrollable = true
}) => {
  const scrollableClass = scrollable ? 'window-content-scrollable' : 'overflow-hidden';
  
  return (
    <div className={`p-4 h-full bg-white-smoke ${scrollableClass} ${className}`}>
      {children}
    </div>
  );
};

export default WindowContent;
