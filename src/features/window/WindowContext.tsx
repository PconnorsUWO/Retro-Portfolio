import React, { createContext, useContext, useState } from 'react';

interface WindowContextValue {
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
}

const WindowContext = createContext<WindowContextValue | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};

interface WindowProviderProps {
  children: React.ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [isResizing, setIsResizing] = useState(false);

  const value = {
    isResizing,
    setIsResizing
  };

  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  );
};
