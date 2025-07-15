import { useState, useCallback, useRef } from 'react';
import { WindowSize, WindowPosition, UseWindowResizeOptions } from '../features/window/types';
import { 
  calculateWindowCorners, 
  applyCornerConstraints, 
  calculateWindowFromConstrainedCorners,
  calculateMaxAllowedSize,
  calculateMinAllowedPosition
} from '../features/window/utils';

export const useWindowResize = (options: UseWindowResizeOptions = {}) => {
  const {
    minWidth = 200,
    minHeight = 150,
    maxWidth = window.innerWidth - 100,
    maxHeight = window.innerHeight - 100,
    initialWidth = 400,
    initialHeight = 300,
    initialX = 0,
    initialY = 0,
    cornerConstraints
  } = options;

  const [size, setSize] = useState<WindowSize>({
    width: initialWidth,
    height: initialHeight
  });

  const [position, setPosition] = useState<WindowPosition>({
    x: initialX,
    y: initialY
  });

  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startPosX: number;
    startPosY: number;
    direction: string;
  } | null>(null);

  const startResize = useCallback((e: React.MouseEvent, direction: string, currentPosition: WindowPosition) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: currentPosition.x,
      startPosY: currentPosition.y,
      direction
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeRef.current) return;

      const { startX, startY, startWidth, startHeight, startPosX, startPosY, direction } = resizeRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newPosX = startPosX;
      let newPosY = startPosY;

      // Handle different resize directions with constraint checking
      if (direction.includes('e')) {
        const maxAllowedSize = calculateMaxAllowedSize({ x: startPosX, y: startPosY }, cornerConstraints, minWidth, minHeight);
        newWidth = Math.max(minWidth, Math.min(maxWidth, Math.min(maxAllowedSize.width, startWidth + deltaX)));
      }
      if (direction.includes('w')) {
        const minAllowedPos = calculateMinAllowedPosition({ width: startWidth, height: startHeight }, cornerConstraints);
        const maxLeftMove = startPosX - (minAllowedPos.x === -Infinity ? 0 : minAllowedPos.x);
        const actualDeltaX = Math.max(-maxLeftMove, -deltaX);
        const widthChange = Math.max(minWidth, Math.min(maxWidth, startWidth + actualDeltaX)) - startWidth;
        newWidth = startWidth + widthChange;
        newPosX = startPosX - widthChange;
      }
      if (direction.includes('s')) {
        const maxAllowedSize = calculateMaxAllowedSize({ x: startPosX, y: startPosY }, cornerConstraints, minWidth, minHeight);
        newHeight = Math.max(minHeight, Math.min(maxHeight, Math.min(maxAllowedSize.height, startHeight + deltaY)));
      }
      if (direction.includes('n')) {
        const minAllowedPos = calculateMinAllowedPosition({ width: startWidth, height: startHeight }, cornerConstraints);
        const maxTopMove = startPosY - (minAllowedPos.y === -Infinity ? 0 : minAllowedPos.y);
        const actualDeltaY = Math.max(-maxTopMove, -deltaY);
        const heightChange = Math.max(minHeight, Math.min(maxHeight, startHeight + actualDeltaY)) - startHeight;
        newHeight = startHeight + heightChange;
        newPosY = startPosY - heightChange;
      }

      let finalSize = { width: newWidth, height: newHeight };
      let finalPosition = { x: newPosX, y: newPosY };

      // Apply corner constraints if they exist
      if (cornerConstraints) {
        // Calculate what the corners would be with the new size and position
        const wouldBeCorners = calculateWindowCorners(finalPosition, finalSize);
        const constrainedCorners = applyCornerConstraints(wouldBeCorners, cornerConstraints);
        
        // Check if any corners were constrained and adjust accordingly
        const wasConstrained = Object.keys(constrainedCorners).some((key) => {
          const corner = key as keyof typeof constrainedCorners;
          return (
            constrainedCorners[corner].x !== wouldBeCorners[corner].x ||
            constrainedCorners[corner].y !== wouldBeCorners[corner].y
          );
        });
        
        if (wasConstrained) {
          // Calculate the adjusted position and size based on constrained corners
          const { position: adjustedPosition, size: adjustedSize } = calculateWindowFromConstrainedCorners(
            finalPosition,
            finalSize,
            wouldBeCorners,
            constrainedCorners
          );
          
          // Ensure the adjusted size doesn't go below minimum constraints
          finalSize = {
            width: Math.max(minWidth, adjustedSize.width),
            height: Math.max(minHeight, adjustedSize.height)
          };
          finalPosition = adjustedPosition;
        }
      }

      setSize(finalSize);
      setPosition(finalPosition);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size, position, minWidth, minHeight, maxWidth, maxHeight, cornerConstraints]);

  return {
    size,
    position,
    isResizing,
    startResize,
    setSize,
    setPosition
  };
};
