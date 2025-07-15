import React from 'react';
import CloseButton from '../../components/buttons/CloseButton';
import MinimizeButton from '../../components/buttons/MinimizeButton';
import MaximizeButton from '../../components/buttons/MaximizeButton';

interface WindowHeaderProps {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onExpand?: () => void;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  return (
    <div className="window-header flex items-center justify-between p-2 bg-dark-grey text-white-smoke border-b-2 border-black cursor-move">
      {/* Title */}
      <span className="font-retro text-sm select-none">
        {title}
      </span>
      
      {/* Window Controls */}
      <div className="flex items-center gap-1">
        {/* Minimize Button */}
        {onMinimize && (
          <MinimizeButton onClick={onMinimize} size={24} />
        )}
        
        {/* Maximize Button */}
        {onMaximize && (
          <MaximizeButton onClick={onMaximize} size={24} />
        )}
        
        {/* Close Button */}
        {onClose && (
          <div onMouseDown={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose} size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;
