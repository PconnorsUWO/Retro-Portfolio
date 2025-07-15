import { useMemo, useEffect } from 'react';
import { WindowCorners, WindowPosition, WindowSize, WindowCornerConstraints } from './types';
import { calculateWindowCorners, applyCornerConstraints } from './utils';

interface UseWindowCornersOptions {
  position: WindowPosition;
  size: WindowSize;
  onCornersChange?: (corners: WindowCorners) => void;
  cornerConstraints?: WindowCornerConstraints;
}

export const useWindowCorners = ({ 
  position, 
  size, 
  onCornersChange,
  cornerConstraints 
}: UseWindowCornersOptions) => {
  const corners = useMemo<WindowCorners>(() => {
    const calculatedCorners = calculateWindowCorners(position, size);
    return applyCornerConstraints(calculatedCorners, cornerConstraints);
  }, [position, size, cornerConstraints]);

  useEffect(() => {
    if (onCornersChange) {
      onCornersChange(corners);
    }
  }, [corners, onCornersChange]);

  return corners;
};
