import React, { useState, useEffect } from 'react';

interface ShutDownProps {
  isActive: boolean;
  onAnimationComplete: () => void;
}

const ShutDown: React.FC<ShutDownProps> = ({ isActive, onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState<'idle' | 'closing' | 'complete'>('idle');

  useEffect(() => {
    if (isActive) {
      setAnimationStage('closing');
      
      // Duration matches the CSS animation (2s)
      const timer = setTimeout(() => {
        setAnimationStage('complete');
        onAnimationComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onAnimationComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Top panel */}
      <div 
        className={`absolute top-0 left-0 w-full bg-black transition-all duration-[2000ms] ease-in-out ${
          animationStage === 'closing' ? 'h-1/2' : 'h-0'
        }`}
      />
      
      {/* Bottom panel */}
      <div 
        className={`absolute bottom-0 left-0 w-full bg-black transition-all duration-[2000ms] ease-in-out ${
          animationStage === 'closing' ? 'h-1/2' : 'h-0'
        }`}
      />

      {/* Optional: Add a subtle scanline effect during closing */}
      {animationStage === 'closing' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[2px] opacity-50 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default ShutDown;