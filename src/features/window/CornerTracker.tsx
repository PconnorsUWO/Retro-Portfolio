import React from 'react';
import { WindowCorners } from './types';

interface CornerTrackerProps {
  corner: keyof WindowCorners;
  position: { x: number; y: number };
}

const CornerTracker: React.FC<CornerTrackerProps> = ({ corner, position: cornerPos }) => {
  const getTrackerStyle = (): React.CSSProperties => {
    const isRight = corner.includes('Right');
    const isBottom = corner.includes('bottom');
    
    return {
      left: isRight ? cornerPos.x - 80 : cornerPos.x + 5,
      top: isBottom ? cornerPos.y - 25 : cornerPos.y + 5,
      transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <div
      className="absolute bg-retro-green text-black text-xs px-1 py-0.5 font-mono rounded z-50 pointer-events-none"
      style={getTrackerStyle()}
    >
      {corner}: ({cornerPos.x}, {cornerPos.y})
    </div>
  );
};

export default CornerTracker;
