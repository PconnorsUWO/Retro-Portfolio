import { WindowCorners, WindowPosition, WindowSize, WindowCornerConstraints } from './types';

/**
 * Calculate window corner positions based on position and size
 */
export const calculateWindowCorners = (
  position: WindowPosition,
  size: WindowSize
): WindowCorners => {
  const { x: posX, y: posY } = position;
  const { width: w, height: h } = size;
  
  return {
    topLeft: { x: posX, y: posY },
    topRight: { x: posX + w, y: posY },
    bottomLeft: { x: posX, y: posY + h },
    bottomRight: { x: posX + w, y: posY + h }
  };
};

/**
 * Get default window bounds
 */
export const getDefaultWindowBounds = () => ({
  maxWidth: window.innerWidth,
  maxHeight: window.innerHeight - window.innerHeight * 0.1
});

/**
 * Constrain position within bounds
 */
export const constrainPosition = (
  position: WindowPosition,
  size: WindowSize,
  bounds?: { width: number; height: number }
): WindowPosition => {
  if (!bounds) return position;
  
  const maxX = bounds.width - size.width;
  const maxY = bounds.height - size.height;
  
  return {
    x: Math.max(0, Math.min(position.x, maxX)),
    y: Math.max(0, Math.min(position.y, maxY))
  };
};

/**
 * Constrain size within min/max bounds
 */
export const constrainSize = (
  size: WindowSize,
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number
): WindowSize => ({
  width: Math.max(minWidth, Math.min(size.width, maxWidth)),
  height: Math.max(minHeight, Math.min(size.height, maxHeight))
});

/**
 * Create corner constraints for a rectangular boundary
 */
export const createRectangularConstraints = (
  bounds: { left: number; top: number; right: number; bottom: number }
): WindowCornerConstraints => ({
  topLeft: { maxX: bounds.left, maxY: bounds.top },
  topRight: { maxX: bounds.right, maxY: bounds.top },
  bottomLeft: { maxX: bounds.left, maxY: bounds.bottom },
  bottomRight: { maxX: bounds.right, maxY: bounds.bottom }
});

/**
 * Create corner constraints for keeping window within viewport
 */
export const createViewportConstraints = (): WindowCornerConstraints => {
  const viewport = {
    left: window.innerWidth,
    top: window.innerHeight,
    right: window.innerWidth,
    bottom: window.innerHeight - window.innerHeight * 0.1
  };
  
  return createRectangularConstraints(viewport);
};

/**
 * Create corner constraints for a specific corner only
 */
export const createSingleCornerConstraint = (
  corner: keyof WindowCorners,
  maxX?: number,
  maxY?: number
): WindowCornerConstraints => ({
  [corner]: { maxX, maxY }
});

/**
 * Calculate draggable bounds from corner constraints
 */
export const calculateDraggableBounds = (
  size: WindowSize,
  cornerConstraints?: WindowCornerConstraints
): { left: number; top: number; right: number; bottom: number } | string => {
  if (!cornerConstraints) return 'parent';
  
  let minX = -Infinity;
  let minY = -Infinity;
  let maxX = Infinity;
  let maxY = Infinity;
  
  // Check each corner constraint to determine bounds
  if (cornerConstraints.topLeft) {
    if (cornerConstraints.topLeft.maxX !== undefined) {
      maxX = Math.min(maxX, cornerConstraints.topLeft.maxX);
    }
    if (cornerConstraints.topLeft.maxY !== undefined) {
      maxY = Math.min(maxY, cornerConstraints.topLeft.maxY);
    }
  }
  
  if (cornerConstraints.topRight) {
    if (cornerConstraints.topRight.maxX !== undefined) {
      maxX = Math.min(maxX, cornerConstraints.topRight.maxX - size.width);
    }
    if (cornerConstraints.topRight.maxY !== undefined) {
      maxY = Math.min(maxY, cornerConstraints.topRight.maxY);
    }
  }
  
  if (cornerConstraints.bottomLeft) {
    if (cornerConstraints.bottomLeft.maxX !== undefined) {
      maxX = Math.min(maxX, cornerConstraints.bottomLeft.maxX);
    }
    if (cornerConstraints.bottomLeft.maxY !== undefined) {
      maxY = Math.min(maxY, cornerConstraints.bottomLeft.maxY - size.height);
    }
  }
  
  if (cornerConstraints.bottomRight) {
    if (cornerConstraints.bottomRight.maxX !== undefined) {
      maxX = Math.min(maxX, cornerConstraints.bottomRight.maxX - size.width);
    }
    if (cornerConstraints.bottomRight.maxY !== undefined) {
      maxY = Math.min(maxY, cornerConstraints.bottomRight.maxY - size.height);
    }
  }
  
  // If no finite bounds were set, use parent bounds
  if (maxX === Infinity && maxY === Infinity && minX === -Infinity && minY === -Infinity) {
    return 'parent';
  }
  
  return {
    left: minX === -Infinity ? 0 : minX,
    top: minY === -Infinity ? 0 : minY,
    right: maxX === Infinity ? window.innerWidth : maxX,
    bottom: maxY === Infinity ? window.innerHeight : maxY
  };
};

/**
 * Apply corner constraints to calculated corners
 */
export const applyCornerConstraints = (
  corners: WindowCorners,
  constraints?: WindowCornerConstraints
): WindowCorners => {
  if (!constraints) return corners;

  const constrainedCorners = { ...corners };

  // Apply constraints to each corner
  Object.keys(constraints).forEach((cornerKey) => {
    const corner = cornerKey as keyof WindowCorners;
    const constraint = constraints[corner];
    
    if (constraint && constrainedCorners[corner]) {
      if (constraint.maxX !== undefined) {
        constrainedCorners[corner].x = Math.min(constrainedCorners[corner].x, constraint.maxX);
      }
      if (constraint.maxY !== undefined) {
        constrainedCorners[corner].y = Math.min(constrainedCorners[corner].y, constraint.maxY);
      }
    }
  });

  return constrainedCorners;
};

/**
 * Calculate window position and size based on constrained corners
 */
export const calculateWindowFromConstrainedCorners = (
  originalPosition: WindowPosition,
  originalSize: WindowSize,
  corners: WindowCorners,
  constrainedCorners: WindowCorners
): { position: WindowPosition; size: WindowSize } => {
  // Calculate the differences
  const topLeftDiff = {
    x: constrainedCorners.topLeft.x - corners.topLeft.x,
    y: constrainedCorners.topLeft.y - corners.topLeft.y
  };

  const bottomRightDiff = {
    x: constrainedCorners.bottomRight.x - corners.bottomRight.x,
    y: constrainedCorners.bottomRight.y - corners.bottomRight.y
  };

  // Adjust position based on top-left constraint
  const newPosition = {
    x: originalPosition.x + topLeftDiff.x,
    y: originalPosition.y + topLeftDiff.y
  };

  // Adjust size based on both constraints
  const newSize = {
    width: originalSize.width + bottomRightDiff.x - topLeftDiff.x,
    height: originalSize.height + bottomRightDiff.y - topLeftDiff.y
  };

  return { position: newPosition, size: newSize };
};

/**
 * Calculate maximum allowed size based on corner constraints and current position
 */
export const calculateMaxAllowedSize = (
  position: WindowPosition,
  cornerConstraints?: WindowCornerConstraints,
  minWidth = 200,
  minHeight = 150
): WindowSize => {
  if (!cornerConstraints) {
    return { width: Infinity, height: Infinity };
  }
  
  let maxWidth = Infinity;
  let maxHeight = Infinity;
  
  // Check constraints for each corner to determine maximum size
  if (cornerConstraints.topRight?.maxX !== undefined) {
    maxWidth = Math.min(maxWidth, cornerConstraints.topRight.maxX - position.x);
  }
  
  if (cornerConstraints.bottomRight?.maxX !== undefined) {
    maxWidth = Math.min(maxWidth, cornerConstraints.bottomRight.maxX - position.x);
  }
  
  if (cornerConstraints.bottomLeft?.maxY !== undefined) {
    maxHeight = Math.min(maxHeight, cornerConstraints.bottomLeft.maxY - position.y);
  }
  
  if (cornerConstraints.bottomRight?.maxY !== undefined) {
    maxHeight = Math.min(maxHeight, cornerConstraints.bottomRight.maxY - position.y);
  }
  
  return {
    width: Math.max(minWidth, maxWidth === Infinity ? Infinity : maxWidth),
    height: Math.max(minHeight, maxHeight === Infinity ? Infinity : maxHeight)
  };
};

/**
 * Calculate minimum allowed position based on corner constraints and current size
 */
export const calculateMinAllowedPosition = (
  size: WindowSize,
  cornerConstraints?: WindowCornerConstraints
): WindowPosition => {
  if (!cornerConstraints) {
    return { x: -Infinity, y: -Infinity };
  }
  
  let minX = -Infinity;
  let minY = -Infinity;
  
  // Check constraints for each corner to determine minimum position
  if (cornerConstraints.topLeft?.maxX !== undefined) {
    minX = Math.max(minX, cornerConstraints.topLeft.maxX);
  }
  
  if (cornerConstraints.topRight?.maxX !== undefined) {
    minX = Math.max(minX, cornerConstraints.topRight.maxX - size.width);
  }
  
  if (cornerConstraints.topLeft?.maxY !== undefined) {
    minY = Math.max(minY, cornerConstraints.topLeft.maxY);
  }
  
  if (cornerConstraints.bottomLeft?.maxY !== undefined) {
    minY = Math.max(minY, cornerConstraints.bottomLeft.maxY - size.height);
  }
  
  return {
    x: minX === -Infinity ? -Infinity : minX,
    y: minY === -Infinity ? -Infinity : minY
  };
};
