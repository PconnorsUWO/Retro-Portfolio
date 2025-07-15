import { useState, useEffect } from 'react'
import LoadingScreen from './features/loading/LoadingScreen'
import Desktop from './features/desktop/Desktop'
import ShutDown from './features/animations/ShutDown'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isShuttingDown, setIsShuttingDown] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleShutDown = () => {
    setIsShuttingDown(true)
  }

  const handleShutDownComplete = () => {
    setIsShuttingDown(false)
    setIsLoading(true)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <>
      <Desktop onShutDown={handleShutDown} />
      <ShutDown isActive={isShuttingDown} onAnimationComplete={handleShutDownComplete} />
    </>
  )
}

export default App