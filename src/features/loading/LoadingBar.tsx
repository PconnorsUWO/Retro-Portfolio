import { useState, useEffect, useMemo } from 'react'

const TOTAL_CELLS = 14

// ■ CONFIG OBJECT ■
const cellConfig = {
  count: TOTAL_CELLS,
  sizeClass: 'flex-1 h-full', 
  activeBgClass: 'bg-white-smoke',
  inactiveBgClass: 'bg-black',
  transitionClass: 'transition-[width] duration-300 ease-out', // for the cover
}

interface LoadingBarProps {
  onComplete: () => void;
}

const LoadingBar = ({ onComplete }: LoadingBarProps) => {
  const [progress, setProgress] = useState(0)

  const cells = useMemo(
    () => Array.from({ length: cellConfig.count }, (_, idx) => ({ id: idx })),
    []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Add a small delay before calling onComplete for better UX
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + (100 / cellConfig.count)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="relative flex gap-[0.2rem] w-full h-full">
      {cells.map(cell => (
        <div
          key={cell.id}
          className={`${cellConfig.sizeClass} ${cellConfig.activeBgClass} `}
        />
      ))}

      <div
        className={`absolute inset-y-0 right-0 bg-black ${cellConfig.transitionClass}`}
        style={{ width: `${100 - progress}%` }}
      />
    </div>
  )
}

export default LoadingBar