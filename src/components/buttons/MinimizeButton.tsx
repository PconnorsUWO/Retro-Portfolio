import React from 'react';

interface MinimizeButtonProps {
  onClick: () => void;
  size?: number;
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({ onClick, size = 24 }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white-smoke cursor-pointer shadow-retro-double transition-colors flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="text-black font-bold text-xs">─</span>
    </button>
  );
};

export default MinimizeButton;
