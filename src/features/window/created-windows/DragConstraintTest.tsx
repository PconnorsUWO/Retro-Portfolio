import React, { useState } from 'react';
import { Window, WindowCorners, createRectangularConstraints } from '../';

const DragConstraintTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [corners, setCorners] = useState<WindowCorners>({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });

  // Create a constraint boundary
  const constraintBoundary = {
    left: 100,
    top: 100,
    right: 700,
    bottom: 500
  };

  const constraints = createRectangularConstraints(constraintBoundary);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCornersChange = (newCorners: WindowCorners) => {
    setCorners(newCorners);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Visual boundary indicator */}
      <div 
        className="fixed border-2 border-retro-green border-dashed pointer-events-none z-10"
        style={{
          left: constraintBoundary.left,
          top: constraintBoundary.top,
          width: constraintBoundary.right - constraintBoundary.left,
          height: constraintBoundary.bottom - constraintBoundary.top,
        }}
      />
      
      <Window
        title="Drag & Resize Bounds Test"
        width={300}
        height={200}
        x={200}
        y={150}
        onClose={handleClose}
        resizable={true}
        minWidth={200}
        minHeight={150}
        onCornersChange={handleCornersChange}
        showCornerTrackers={true}
        cornerConstraints={constraints}
      >
        <div className="space-y-4">
          <h2 className="font-retro text-lg text-black">Drag & Resize Bounds Test</h2>
          
          <div className="bg-retro-amber p-3 rounded">
            <h3 className="font-retro text-base text-black mb-2">Constraint Features:</h3>
            <ul className="font-retro text-sm text-black space-y-1">
              <li>• Dragging uses react-draggable bounds prop</li>
              <li>• Resizing enforces corner constraints</li>
              <li>• Try dragging outside the green boundary ❌</li>
              <li>• Try resizing beyond the boundary ❌</li>
              <li>• Both operations respect the same limits</li>
            </ul>
          </div>

          <div className="bg-light-grey p-2 rounded">
            <h4 className="font-retro text-sm text-black mb-1">Constraint Boundary:</h4>
            <p className="font-mono text-xs text-black">
              Left: {constraintBoundary.left}, Top: {constraintBoundary.top}<br/>
              Right: {constraintBoundary.right}, Bottom: {constraintBoundary.bottom}
            </p>
          </div>

          <div className="bg-light-grey p-2 rounded">
            <h4 className="font-retro text-sm text-black mb-1">Window Bounds:</h4>
            <div className="font-mono text-xs text-black">
              <div>Width: {constraintBoundary.right - constraintBoundary.left}px</div>
              <div>Height: {constraintBoundary.bottom - constraintBoundary.top}px</div>
            </div>
          </div>

          <div className="bg-light-grey p-2 rounded">
            <h4 className="font-retro text-sm text-black mb-1">Current Position:</h4>
            <div className="font-mono text-xs text-black">
              <div>Top-Left: ({corners.topLeft.x}, {corners.topLeft.y})</div>
              <div>Bottom-Right: ({corners.bottomRight.x}, {corners.bottomRight.y})</div>
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};

export default DragConstraintTest;
