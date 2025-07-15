import React from 'react';

interface MaximizeButtonProps {
  onClick: () => void;
  size?: number;
}

const MaximizeButton: React.FC<MaximizeButtonProps> = ({ onClick, size = 24 }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white-smoke cursor-pointer shadow-retro-double transition-colors flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <span className="text-black font-bold text-s pb-[.2rem]">□</span>
    </button>
  );
};

export default MaximizeButton;
