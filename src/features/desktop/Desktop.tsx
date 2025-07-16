import React from 'react';

import TaskBar from '../taskbar/TaskBar';
import DesktopIcon from '../../components/DesktopIcon';
import WelcomeCard from './WelcomeCard';
import TestWindow from '../window/created-windows/TestWindow';
import WindowWithCornerTracking from '../window/created-windows/WindowWithCornerTracking';
import DragConstraintTest from '../window/created-windows/KeyboardSoundDemo';

interface DesktopProps {
  onShutDown: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onShutDown }) => {
  return (
    <div 
      className="w-screen h-screen"
      style={{
        backgroundImage: "url('./desktop-background.svg')",
        backgroundSize: '2px 2px',
        backgroundRepeat: 'repeat',
        backgroundColor: 'black' 
      }}
    >
      {/* Desktop content will go here */}
      <div className="w-full h-full relative">
        {/* Desktop Icons Container */}
        <div className="absolute inset-0 p-4">
          <DesktopIcon 
            icon={<img src="./folder.svg" alt="folder" />}
            text="PROJECTS"
            x={30}
            y={30}
            size={64}
            onClick={() => console.log('My Projects clicked')}
          />
          <DesktopIcon 
            icon={<img src="./doc.svg" alt="document" />}
            text="DOCUMENTS"
            x={30}
            y={180}
            size={64}
            onClick={() => console.log('Resume clicked')}
          />
          <DesktopIcon 
            icon={<img src="./disk.svg" alt="disk" />}
            text="HELP"
            x={30}
            y={330}
            size={64}
            onClick={() => console.log('Portfolio clicked')}
          />
        </div>
        
        {/* Desktop Logo and Welcome Text */}

        <WelcomeCard />
        
        {/* Desktop Windows */}
        {/* Additional desktop content can go here */}

        
        {/* Desktop icons and windows will be rendered here */}
        <TaskBar onShutDown={onShutDown} />
      </div>
    </div>
  );
};

export default Desktop;