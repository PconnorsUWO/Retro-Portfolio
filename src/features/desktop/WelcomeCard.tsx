import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const WelcomeCard: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-[9rem]">
      {/* Welcome Text */}
      <div className="text-center mb-4">
        <h1 className="font-retro text-black text-[3rem] mb-4">
          Welcome to My Website
        </h1>
        
        {/* Cat Logo */}
        <div className="mb-4 flex items-center justify-center">
          <img 
            src="./cat.png" 
            alt="Cat logo" 
            width={120} 
            height={120}
            style={{
              width: 100,
              height: 100,
              objectFit: 'contain'
            }}
          />
        </div>
        
        <p className="font-retro text-black text-[3rem] flex items-center justify-center gap-4">
          I am {' '}
          <TypeAnimation
            sequence={[
              'A Student.',
              4000,
              'A Developer.',
              4000,
              'Unemployed.',
              4000,
            ]}
            wrapper="span"
            speed={{type: 'keyStrokeDelayInMs', value: 300}}
            deletionSpeed={{type: 'keyStrokeDelayInMs', value: 120}}
            style={{ fontSize: '3rem', fontFamily: 'VT323, monospace' }}
            repeat={Infinity}
            cursor={true}
          />
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
