import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
  size?: number;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, size = 24 }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white-smoke cursor-pointer shadow-retro-double transition-colors flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="text-black text-xs">X</span>
    </button>
  );
};

export default CloseButton;