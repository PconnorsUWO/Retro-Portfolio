import React, { useState } from 'react';
import { Window, WindowCorners, createRectangularConstraints } from '../';

const ComprehensiveConstraintTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [corners, setCorners] = useState<WindowCorners>({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });

  // Create multiple constraint boundaries for testing
  const constraintBoundary = {
    left: 150,
    top: 150,
    right: 800,
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
        className="fixed border-2 border-retro-green border-dashed pointer-events-none z-10 bg-retro-green bg-opacity-10"
        style={{
          left: constraintBoundary.left,
          top: constraintBoundary.top,
          width: constraintBoundary.right - constraintBoundary.left,
          height: constraintBoundary.bottom - constraintBoundary.top,
        }}
      />
      
      {/* Boundary labels */}
      <div className="fixed font-mono text-xs text-retro-green font-bold z-20 pointer-events-none"
           style={{ left: constraintBoundary.left + 5, top: constraintBoundary.top + 5 }}>
        Constraint Boundary
      </div>
      
      <Window
        title="Complete Constraint Test"
        width={250}
        height={180}
        x={300}
        y={200}
        onClose={handleClose}
        resizable={true}
        minWidth={200}
        minHeight={150}
        onCornersChange={handleCornersChange}
        showCornerTrackers={true}
        cornerConstraints={constraints}
      >
        <div className="space-y-3">
          <h2 className="font-retro text-base text-black">Constraint Test</h2>
          
          <div className="bg-retro-amber p-2 rounded">
            <h3 className="font-retro text-sm text-black mb-1">Test Both:</h3>
            <ul className="font-retro text-xs text-black space-y-0.5">
              <li>• Drag window</li>
              <li>• Resize from all handles</li>
              <li>• Both respect boundaries</li>
            </ul>
          </div>

          <div className="bg-light-grey p-2 rounded">
            <h4 className="font-retro text-xs text-black mb-1">Boundary Size:</h4>
            <div className="font-mono text-xs text-black">
              {constraintBoundary.right - constraintBoundary.left} × {constraintBoundary.bottom - constraintBoundary.top}
            </div>
          </div>

          <div className="bg-light-grey p-2 rounded">
            <h4 className="font-retro text-xs text-black mb-1">Position:</h4>
            <div className="font-mono text-xs text-black">
              ({corners.topLeft.x}, {corners.topLeft.y})
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};

export default ComprehensiveConstraintTest;
