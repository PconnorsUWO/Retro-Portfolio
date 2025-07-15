import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  x?: number;
  y?: number;
  size?: number; 
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  text, 
  onClick, 
  x = 0, 
  y = 0,
  size = 50
}) => {
  const containerSize = size + 16; 
  const maxTextWidth = Math.max(80, containerSize + 16); 
  return (
    <div 
      className="absolute flex flex-col items-center cursor-pointer hover:bg-opacity-20 p-2 rounded select-none"
      style={{ left: x, top: y }}
      onClick={onClick}
    >
      {/* Icon */}
      <div 
        className="mb-1 flex items-center justify-center"
        style={{ 
          width: containerSize, 
          height: containerSize 
        }}
      >
        {React.isValidElement(icon) ? 
          React.cloneElement(icon, {
            width: size,
            height: size,
            style: { 
              width: size,
              height: size,
              objectFit: 'contain'
            }
          } as any) : icon
        }
      </div>
      
      {/* Text */}
      <span 
        className="font-retro text-black text-center leading-tight"
        style={{ 
          maxWidth: maxTextWidth,
          fontSize: '1.8rem',
          width: '3rem',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default DesktopIcon;
