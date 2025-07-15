import React from 'react';
import ResizeHandle from './ResizeHandle';
import { ResizeDirection, WindowPosition } from './types';

interface ResizeHandlesProps {
  resizable: boolean;
  position: WindowPosition;
  isResizing: boolean;
  onStartResize: (e: React.MouseEvent, direction: ResizeDirection, position: WindowPosition) => void;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({
  resizable,
  position,
  isResizing,
  onStartResize
}) => {
  if (!resizable) return null;

  const cornerDirections: ResizeDirection[] = ['nw', 'ne', 'sw', 'se'];
  const edgeDirections: ResizeDirection[] = ['n', 's', 'w', 'e'];

  return (
    <>
      {/* Corner handles */}
      {cornerDirections.map((direction) => (
        <ResizeHandle
          key={direction}
          direction={direction}
          onMouseDown={onStartResize}
          position={position}
          isResizing={isResizing}
        />
      ))}
      
      {/* Edge handles */}
      {edgeDirections.map((direction) => (
        <ResizeHandle
          key={direction}
          direction={direction}
          onMouseDown={onStartResize}
          position={position}
          isResizing={isResizing}
        />
      ))}
    </>
  );
};

export default ResizeHandles;
