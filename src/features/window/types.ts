export interface WindowCorners {
  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

export interface WindowCornerConstraints {
  topLeft?: { maxX?: number; maxY?: number };
  topRight?: { maxX?: number; maxY?: number };
  bottomLeft?: { maxX?: number; maxY?: number };
  bottomRight?: { maxX?: number; maxY?: number };
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMinimized?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onCornersChange?: (corners: WindowCorners) => void;
  showCornerTrackers?: boolean;
  cornerConstraints?: WindowCornerConstraints;
}

export interface UseWindowResizeOptions {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  cornerConstraints?: WindowCornerConstraints;
}

export type ResizeDirection = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';
