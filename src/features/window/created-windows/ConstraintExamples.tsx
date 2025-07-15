import React, { useState } from 'react';
import { 
  Window, 
  WindowCorners, 
  WindowCornerConstraints,
  createRectangularConstraints,
  createViewportConstraints,
  createSingleCornerConstraint 
} from '../';

const ConstraintExamples: React.FC = () => {
  const [activeExample, setActiveExample] = useState<string>('rectangular');
  const [corners, setCorners] = useState<WindowCorners>({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });

  // Different constraint examples
  const constraints: Record<string, WindowCornerConstraints> = {
    rectangular: createRectangularConstraints({
      left: 100,
      top: 100,
      right: 600,
      bottom: 400
    }),
    viewport: createViewportConstraints(50),
    topLeftOnly: createSingleCornerConstraint('topLeft', 200, 150),
    bottomRightOnly: createSingleCornerConstraint('bottomRight', 700, 500),
    mixed: {
      topLeft: { maxX: 300, maxY: 200 },
      bottomRight: { maxX: 800, maxY: 600 }
    }
  };

  const handleCornersChange = (newCorners: WindowCorners) => {
    setCorners(newCorners);
  };

  const constraintDescriptions: Record<string, string> = {
    rectangular: 'All corners constrained to a rectangle (100,100) to (600,400)',
    viewport: 'All corners constrained to viewport with 50px margin',
    topLeftOnly: 'Only top-left corner constrained to (200,150)',
    bottomRightOnly: 'Only bottom-right corner constrained to (700,500)',
    mixed: 'Mixed constraints: top-left (300,200), bottom-right (800,600)'
  };

  return (
    <Window
      title="Corner Constraint Examples"
      width={500}
      height={400}
      x={100}
      y={100}
      resizable={true}
      minWidth={400}
      minHeight={300}
      onCornersChange={handleCornersChange}
      showCornerTrackers={true}
      cornerConstraints={constraints[activeExample]}
    >
      <div className="space-y-4">
        <h2 className="font-retro text-xl text-black">Corner Constraint Examples</h2>
        
        <div className="bg-light-grey p-3 rounded">
          <h3 className="font-retro text-lg text-black mb-2">Select Constraint Type:</h3>
          <div className="space-y-2">
            {Object.keys(constraints).map((key) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="constraint"
                  value={key}
                  checked={activeExample === key}
                  onChange={(e) => setActiveExample(e.target.value)}
                  className="form-radio"
                />
                <span className="font-retro text-sm text-black">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-retro-amber p-3 rounded">
          <h3 className="font-retro text-lg text-black mb-2">Current Constraint:</h3>
          <p className="font-mono text-sm text-black">
            {constraintDescriptions[activeExample]}
          </p>
        </div>

        <div className="bg-light-grey p-3 rounded">
          <h3 className="font-retro text-lg text-black mb-2">Current Corner Positions:</h3>
          <div className="font-mono text-xs text-black space-y-1">
            <div>Top-Left: ({corners.topLeft.x}, {corners.topLeft.y})</div>
            <div>Top-Right: ({corners.topRight.x}, {corners.topRight.y})</div>
            <div>Bottom-Left: ({corners.bottomLeft.x}, {corners.bottomLeft.y})</div>
            <div>Bottom-Right: ({corners.bottomRight.x}, {corners.bottomRight.y})</div>
          </div>
        </div>

        <div className="bg-retro-green p-3 rounded">
          <p className="font-retro text-black text-sm">
            Try resizing and moving this window with different constraint types selected!
          </p>
        </div>
      </div>
    </Window>
  );
};

export default ConstraintExamples;
