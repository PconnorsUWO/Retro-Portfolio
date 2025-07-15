import React from 'react';
import { ResizeDirection, WindowPosition } from './types';

interface ResizeHandleProps {
  direction: ResizeDirection;
  onMouseDown: (e: React.MouseEvent, direction: ResizeDirection, position: WindowPosition) => void;
  position: WindowPosition;
  isResizing: boolean;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  direction, 
  onMouseDown, 
  position, 
  isResizing 
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown(e, direction, position);
  };

  return (
    <div
      className={`resize-handle resize-handle-${direction}`}
      onMouseDown={handleMouseDown}
      style={{
        cursor: isResizing ? 'grabbing' : 'grab'
      }}
    />
  );
};

export default ResizeHandle;
