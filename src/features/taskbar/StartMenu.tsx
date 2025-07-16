import React from 'react';
import CloseButton from '../../components/buttons/CloseButton';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShutDown: () => void;
}

interface MenuItemProps {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  textSize?: string;
  textColor?: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  text, 
  onClick, 
  textSize = 'text-[2rem]',
  textColor = 'text-black',
  className = '',
  iconSize = '2rem',
  iconColor = '#141414'
}) => {
  const styledIcon = React.isValidElement(icon) ? 
    (icon.type === 'img' ? 
      React.cloneElement(icon, {
        width: iconSize,
        height: iconSize,
        style: { 
          width: iconSize,
          height: iconSize,
          objectFit: 'contain'
        }
      } as any) :
      React.cloneElement(icon, {
        width: iconSize,
        height: iconSize,
        style: { 
          stroke: iconColor,
          fill: 'none',
          strokeWidth: '2px'
        }
      } as any)
    ) : icon;

  return (
    <button 
      className={`w-full text-left p-2 hover:bg-light-grey font-retro cursor-pointer flex items-center ${textSize} ${textColor} ${className}`}
      onClick={onClick}
    >
      {styledIcon && <span className="mr-2 flex-shrink-0">{styledIcon}</span>}
      <span>{text}</span>
    </button>
  );
};

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onShutDown }) => {
  if (!isOpen) return null;

  const handleShutDown = () => {
    onClose(); // Close the menu first
    onShutDown(); // Then trigger shutdown
  };

  return (
    <>
      {/* Backdrop to close menu when clicking outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu Window */}
      <div className="absolute bottom-full left-0 z-50 min-w-[300px] max-w-[400px] w-max bg-white-smoke shadow-retro-double">
        {/* Title Bar */}
        <div className="flex items-center justify-between p-2 bg-dark-grey text-white">
          <span className="font-retro text-sm"></span>
          <CloseButton onClick={onClose} />
        </div>
        
        {/* Menu Content */}
        <div className="p-4">
          <div className="space-y-2">
            <MenuItem 
              icon={<img src="./folder.svg" alt="folder" />} 
              text="PROJECTS" 
              onClick={() => console.log('Programs clicked')}
            />
            <MenuItem 
              icon={<img src="./doc.svg" alt="doc" />}
              text="DOCUMENTS" 
              onClick={() => console.log('Documents clicked')}
            />
            <MenuItem 
              icon={<img src="./disk.svg" alt="disk" />} 
              text="HELP" 
              onClick={() => console.log('Help clicked')}
            />
            <div className="border-t border-black my-2"></div>
            <MenuItem 
              icon="" 
              text="SHUT DOWN" 
              onClick={handleShutDown}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
