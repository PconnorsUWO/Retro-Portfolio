export { default as Window } from './Window';
export { default as WindowHeader } from './WindowHeader';
export { default as WindowContent } from './WindowContent';
export { default as ResizeHandle } from './ResizeHandle';
export { default as ResizeHandles } from './ResizeHandles';
export { default as CornerTracker } from './CornerTracker';
export { default as CornerTrackers } from './CornerTrackers';
export { WindowProvider, useWindowContext } from './WindowContext';

export * from './types';
export * from './utils';
export * from './useWindowCorners';
export * from './useWindowDrag';

// Example components
export { default as WindowWithCornerConstraints } from './created-windows/WindowWithCornerConstraints';
export { default as KeyboardSoundDemo } from './created-windows/KeyboardSoundDemo';
export { default as KeyboardSoundDemoWindow } from './created-windows/KeyboardSoundDemoWindow';
export { default as TestWindow } from './created-windows/TestWindow';
