import React, { useState } from 'react';
import { Window, WindowCorners, WindowCornerConstraints } from '../';

const WindowWithCornerConstraints: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [corners, setCorners] = useState<WindowCorners>({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });

  // Define corner constraints
  const cornerConstraints: WindowCornerConstraints = {
    topLeft: { maxX: 300, maxY: 200 },
    topRight: { maxX: 800, maxY: 200 },
    bottomLeft: { maxX: 300, maxY: 600 },
    bottomRight: { maxX: 800, maxY: 600 }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsOpen(false); 
  };

  const handleMaximize = () => {
    console.log('Maximize button clicked');
  };

  const handleCornersChange = (newCorners: WindowCorners) => {
    setCorners(newCorners);
  };

  if (!isOpen) return null;

  return (
    <Window
      title="Window with Corner Constraints"
      width={400}
      height={300}
      x={150}
      y={100}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
      resizable={true}
      minWidth={250}
      minHeight={200}
      onCornersChange={handleCornersChange}
      showCornerTrackers={true}
      cornerConstraints={cornerConstraints}
    >
      <div className="space-y-4">
        <h2 className="font-retro text-xl text-black">Corner Constraints Demo</h2>
        
        <div className="bg-light-grey p-3 rounded">
          <h3 className="font-retro text-lg text-black mb-2">Constraint Settings:</h3>
          <div className="font-mono text-sm text-black space-y-1">
            <div>Top-Left: maxX={cornerConstraints.topLeft?.maxX}, maxY={cornerConstraints.topLeft?.maxY}</div>
            <div>Top-Right: maxX={cornerConstraints.topRight?.maxX}, maxY={cornerConstraints.topRight?.maxY}</div>
            <div>Bottom-Left: maxX={cornerConstraints.bottomLeft?.maxX}, maxY={cornerConstraints.bottomLeft?.maxY}</div>
            <div>Bottom-Right: maxX={cornerConstraints.bottomRight?.maxX}, maxY={cornerConstraints.bottomRight?.maxY}</div>
          </div>
        </div>

        <div className="bg-light-grey p-3 rounded">
          <h3 className="font-retro text-lg text-black mb-2">Current Corner Positions:</h3>
          <div className="font-mono text-sm text-black space-y-1">
            <div>Top-Left: ({corners.topLeft.x}, {corners.topLeft.y})</div>
            <div>Top-Right: ({corners.topRight.x}, {corners.topRight.y})</div>
            <div>Bottom-Left: ({corners.bottomLeft.x}, {corners.bottomLeft.y})</div>
            <div>Bottom-Right: ({corners.bottomRight.x}, {corners.bottomRight.y})</div>
          </div>
        </div>

        <div className="bg-retro-amber p-3 rounded">
          <p className="font-retro text-black">
            Try resizing and moving this window! The corners will be constrained to the maximum values shown above.
          </p>
        </div>
      </div>
    </Window>
  );
};

export default WindowWithCornerConstraints;
