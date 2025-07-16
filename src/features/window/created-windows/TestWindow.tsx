import React, { useState } from 'react';
import { Window } from '../';
import { createViewportConstraints } from '../';

const TestWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsOpen(false); 
  };

  const handleMaximize = () => {
    console.log('Maximize button clicked');
    // Add maximize logic here
  };

  if (!isOpen) return null;

  return (
    <Window
      title="Test Window"
      width={500}
      height={400}
      x={200}
      y={150}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
      resizable={true}
      minWidth={300}
      minHeight={200}
      cornerConstraints={createViewportConstraints()}
    >
      <h2 className="font-retro text-2xl mb-4 text-black">Welcome to the Test Window!</h2>
      <p className="font-retro text-lg text-black mb-4">
        This is a test window that opens on page load so you can work on it.
      </p>
      <p className="font-retro text-base text-black mb-4">
        You can now:
      </p>
      <ul className="font-retro text-base text-black ml-4 mb-4">
        <li>• Close this window using the X button</li>
        <li>• Minimize it using the - button</li>
        <li>• Resize it by dragging the edges and corners</li>
        <li>• Scroll when content exceeds window size</li>
        <li>• Drag the window around by the title bar</li>
      </ul>
      <div className="mt-6 p-4 bg-light-grey rounded">
        <p className="font-retro text-sm text-black mb-2">
          This window uses the modular Window component system with separate header and content modules.
        </p>
        <p className="font-retro text-sm text-black">
          Try resizing this window to see how the content adapts with scrolling!
        </p>
      </div>
      <div className="mt-4 p-4 bg-retro-green text-black rounded">
        <p className="font-retro text-sm">
          New Feature: Dynamic resizing with minimum size constraints!
        </p>
      </div>
      <div className="mt-4">
        <h3 className="font-retro text-lg text-black mb-2">Extra Content for Scrolling Test</h3>
        <p className="font-retro text-base text-black mb-2">
          This is additional content to demonstrate scrolling functionality when the window is resized smaller.
        </p>
        <p className="font-retro text-base text-black mb-2">
          You can scroll both vertically and horizontally if needed.
        </p>
        <p className="font-retro text-base text-black mb-2">
          The scrollbars have a retro styling that matches the overall theme.
        </p>
        <p className="font-retro text-base text-black mb-2">
          Try making the window smaller to see the scrolling in action!
        </p>
      </div>
    </Window>
  );
};

export default TestWindow;
