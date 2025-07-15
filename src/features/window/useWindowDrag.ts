import { useCallback, useMemo } from 'react';
import { WindowPosition, WindowSize, WindowCornerConstraints } from './types';
import { calculateDraggableBounds } from './utils';

interface UseWindowDragOptions {
  onPositionChange: (position: WindowPosition) => void;
  disabled?: boolean;
  size: WindowSize;
  cornerConstraints?: WindowCornerConstraints;
}

export const useWindowDrag = ({ 
  onPositionChange, 
  disabled = false,
  size,
  cornerConstraints
}: UseWindowDragOptions) => {
  // Calculate bounds from corner constraints
  const bounds = useMemo(() => 
    calculateDraggableBounds(size, cornerConstraints),
    [size, cornerConstraints]
  );

  const handleDrag = useCallback(
    (_e: any, data: { x: number; y: number }) => {
      if (disabled) return;
      onPositionChange({ x: data.x, y: data.y });
    },
    [onPositionChange, disabled]
  );

  return { handleDrag, bounds };
};
