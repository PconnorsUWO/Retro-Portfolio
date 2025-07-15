import LoadingBar from './LoadingBar';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black">
    <p className="font-retro text-white-smoke text-[2rem] leading-[20px] mb-[1rem]">
      Loading...
    </p>
      <div className="relative flex items-center justify-center w-[20rem] h-[3rem] p-[0.2rem] border border-white-smoke">
        <LoadingBar onComplete={onLoadingComplete} />
      </div>
    </div>
  );
};

export default LoadingScreen;