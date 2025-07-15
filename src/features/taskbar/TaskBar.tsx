import React, { useState } from 'react';
import StartMenu from './StartMenu';

interface TaskBarProps {
  onShutDown: () => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ onShutDown }) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const closeStartMenu = () => {
    setIsStartMenuOpen(false);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-[10%] p-[.9rem] bg-white-smoke">
      <div className="flex h-full">
        {/* Left column */}
        <div className="flex items-center justify-between gap-[2rem]">
            <button 
              className="bg-white-smoke mx-[1rem] py-[.25rem] shadow-retro-double w-[9rem] cursor-pointer"
              onClick={toggleStartMenu}
            >
            <p className="text-retro font-retro text-[24px] leading-[30px]">MENU</p>
            </button>
            {/* Divider */}
            <div className="w-[2px] h-[calc(30px+0.5rem)] bg-white shadow-retro-single"></div>
        </div>
        {/* Center column */}
        <div className="flex items-center justify-center w-[80vw]">
            {/* Scrolling text div */}
            <div className="relative overflow-hidden w-full h-[calc(30px+0.5rem)] flex items-center px-2 ">
              <div className="absolute whitespace-nowrap text-black font-retro text-[1.5rem] leading-[20px] animate-scroll-full  ">
                ***please hire me***
              </div>
            </div>
            {/* Divider */}
            <div className="w-[2px] h-[calc(30px+0.5rem)] bg-white shadow-retro-single"></div>
        </div>
        {/* Right column */}
        <div className="flex items-center justify-center px-4 gap-2 mr-[10rem]">
          {/* Clock */}
          <div className="flex items-center gap-2 px-[.5rem]">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="13" stroke="#141414" strokeWidth="2"/>
              <path d="M24.75 18H18.25C18.1119 18 18 17.8881 18 17.75V12.75" stroke="#141414" strokeWidth="2" strokeLinecap="square"/>
            </svg>
            <div className="text-black font-retro min-w-[12rem] ml-[.5rem] text-[2rem]">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Start Menu */}
      <StartMenu isOpen={isStartMenuOpen} onClose={closeStartMenu} onShutDown={onShutDown} />
    </div>
  );
};

export default TaskBar;