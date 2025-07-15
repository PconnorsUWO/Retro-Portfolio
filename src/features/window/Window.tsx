import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import WindowHeader from './WindowHeader';
import WindowContent from './WindowContent';
import ResizeHandles from './ResizeHandles';
import CornerTrackers from './CornerTrackers';
import { WindowProvider } from './WindowContext';
import { useWindowResize } from '../../hooks/useWindowResize';
import { useWindowCorners } from './useWindowCorners';
import { useWindowDrag } from './useWindowDrag';
import { WindowProps } from './types';
import { getDefaultWindowBounds } from './utils';

const Window: React.FC<WindowProps> = ({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  isMinimized = false,
  width = 400,
  height = 300,
  x = 100,
  y = 100,
  className = '',
  resizable = true,
  minWidth = 200,
  minHeight = 150,
  maxWidth = getDefaultWindowBounds().maxWidth,
  maxHeight = getDefaultWindowBounds().maxHeight,
  onCornersChange,
  showCornerTrackers = false,
  cornerConstraints
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const { size, position, isResizing, startResize, setPosition } = useWindowResize({
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    initialWidth: width,
    initialHeight: height,
    initialX: x,
    initialY: y,
    cornerConstraints
  });

  // Calculate corner positions using custom hook
  const corners = useWindowCorners({
    position,
    size,
    onCornersChange,
    cornerConstraints
  });

  // Handle dragging with custom hook
  const { handleDrag, bounds } = useWindowDrag({
    onPositionChange: setPosition,
    disabled: isResizing,
    size,
    cornerConstraints
  });

  if (isMinimized) {
    return null; // Hide window when minimized
  }

  return (
    <WindowProvider>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onDrag={handleDrag}
        handle=".window-header"
        bounds={bounds}
        disabled={isResizing}
      >
        <div
          ref={nodeRef}
          className={`window-resizable absolute bg-white-smoke shadow-retro-double flex flex-col ${className}`}
          style={{
            width: size.width,
            height: size.height,
            minWidth: minWidth,
            minHeight: minHeight,
            userSelect: isResizing ? 'none' : 'auto'
          }}
        >
          <WindowHeader
            title={title}
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
          />
          <div className="flex-1 overflow-hidden">
            <WindowContent>
              {children}
            </WindowContent>
          </div>
          
          <ResizeHandles
            resizable={resizable}
            position={position}
            isResizing={isResizing}
            onStartResize={startResize}
          />
        </div>
      </Draggable>
      
      <CornerTrackers
        showCornerTrackers={showCornerTrackers}
        corners={corners}
      />
    </WindowProvider>
  );
};

export default Window;
