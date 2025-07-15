import React, { useState } from 'react';
import { Window, WindowCorners } from '../';

const WindowWithCornerTracking: React.FC = () => {
  const [corners, setCorners] = useState<WindowCorners>({
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 }
  });

  const [showTrackers, setShowTrackers] = useState(true);

  const handleCornersChange = (newCorners: WindowCorners) => {
    setCorners(newCorners);
    // You can also log the corner positions or perform other actions here
    console.log('Window corners updated:', newCorners);
  };

  return (
    <div className="relative w-full h-full">
      <Window
        title="Window with Corner Tracking"
        width={500}
        height={400}
        x={200}
        y={150}
        onCornersChange={handleCornersChange}
        showCornerTrackers={showTrackers}
      >
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold">Corner Tracking Demo</h2>
          <p>This window tracks its corner positions in real-time.</p>
          
          <div className="space-y-2">
            <button
              onClick={() => setShowTrackers(!showTrackers)}
              className="px-4 py-2 bg-retro-blue text-white rounded hover:bg-blue-600"
            >
              {showTrackers ? 'Hide' : 'Show'} Corner Trackers
            </button>
          </div>
          
          <div className="bg-light-grey p-3 rounded">
            <h3 className="font-semibold mb-2">Current Corner Positions:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              <div>Top Left: ({corners.topLeft.x}, {corners.topLeft.y})</div>
              <div>Top Right: ({corners.topRight.x}, {corners.topRight.y})</div>
              <div>Bottom Left: ({corners.bottomLeft.x}, {corners.bottomLeft.y})</div>
              <div>Bottom Right: ({corners.bottomRight.x}, {corners.bottomRight.y})</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>• Drag the window to move it around</p>
            <p>• Resize the window using the handles</p>
            <p>• Watch the corner coordinates update in real-time</p>
          </div>
        </div>
      </Window>
    </div>
  );
};

export default WindowWithCornerTracking;
