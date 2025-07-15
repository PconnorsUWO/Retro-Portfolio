import React from 'react';
import CornerTracker from './CornerTracker';
import { WindowCorners } from './types';

interface CornerTrackersProps {
  showCornerTrackers: boolean;
  corners: WindowCorners;
}

const CornerTrackers: React.FC<CornerTrackersProps> = ({ 
  showCornerTrackers, 
  corners 
}) => {
  if (!showCornerTrackers) return null;

  const cornerKeys = Object.keys(corners) as (keyof WindowCorners)[];

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {cornerKeys.map((corner) => (
        <CornerTracker
          key={corner}
          corner={corner}
          position={corners[corner]}
        />
      ))}
    </div>
  );
};

export default CornerTrackers;
