import { Pause, Play, StepBack, StepForward, Volume1, Volume2, VolumeOff, X } from "lucide-react"
import React, { useEffect, useRef } from 'react'

type Song = {
  id: string,
  "music-name": string,
  "music-author": string,
  "music-cover": string,
  "music-source": string,
  "music-duration": string,
}

type MobilePlayerOverlayProps = {
  isVisible: boolean,
  onClose: () => void,
  currentSong: Song,
  isPlaying: boolean,
  audioProgress: number,
  audioDuration: number,
  volumeProgress: number,
  handleMusicProgress: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleMusicVolume: (e: React.ChangeEvent<HTMLInputElement>) => void,
  togglePlayerState: () => void,
  formatMusicTime: (duration: number) => string,
  playNext: () => void,
  playPrev: () => void,
  analyser: AnalyserNode | null,
}

export default function MobilePlayerOverlay({ 
  isVisible, 
  onClose, 
  currentSong, 
  isPlaying,
  audioProgress,
  audioDuration,
  volumeProgress,
  handleMusicProgress,
  handleMusicVolume,
  togglePlayerState,
  formatMusicTime,
  playNext,
  playPrev,
  analyser
}: MobilePlayerOverlayProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const lastDataArrayRef = useRef<Uint8Array | null>(null)

  const drawWaves = () => {
    if (analyser && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyser.getByteFrequencyData(dataArray)

      if (isPlaying) {
        lastDataArrayRef.current = new Uint8Array(dataArray)
      }

      const displayArray = isPlaying ? dataArray : (lastDataArrayRef.current || dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bufferLength * 2
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (displayArray[i] / 255) * canvas.height

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)')
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      animationRef.current = requestAnimationFrame(drawWaves)
    }
  };

  useEffect(() => {
    if (isVisible && isPlaying) {
      drawWaves()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    };
  }, [isVisible, isPlaying])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = 32
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [])
  
  return (
    <div className={`fixed inset-0 z-50 bg-carbon-black contrast-125 md:hidden transform transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
      <div className={`w-full h-full flex flex-col transform transition-all duration-500 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1/4 opacity-0'}`}>
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={onClose}
            aria-label="Close player"
            className="transition-transform hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <span className="text-white font-outfit">Now Playing</span>
          <div className="w-6" /> 
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img 
            src={currentSong["music-cover"]} 
            alt={currentSong["music-name"]}
            className="w-64 h-64 object-cover rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          />
        </div>

        <div className={`w-full h-8 mt-4 transform transition-all duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        </div>
        
        <div className="mt-8 mb-4 px-4">
          <h2 className="text-white font-outfit text-xl font-bold">{currentSong["music-name"]}</h2>
          <p className="text-white text-opacity-60 font-outfit">{currentSong["music-author"]}</p>
        </div>

        <div className="w-full px-4 space-y-2">
          <input
            type="range"
            min={0}
            max={audioDuration || 0}
            value={audioProgress}
            onChange={handleMusicProgress}
            className="w-full h-1 transition-all duration-300 ease-in-out accent-white outline-none border-none hover:accent-blue-400 hover:h-4"            aria-label="Music progress"
          />
          <div className="flex justify-between text-white text-sm font-outfit">
            <span>{formatMusicTime(audioProgress)}</span>
            <span>{formatMusicTime(audioDuration)}</span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center items-center space-x-8">
          <button 
            onClick={playPrev}
            aria-label="Previous song"
            className="transition-transform hover:scale-110"
          >
            <StepBack className="w-8 h-8 text-white" />
          </button>
          <button 
            onClick={togglePlayerState}
            className="bg-blue-500 p-4 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-blue-600"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? 
              <Pause className="w-8 h-8 text-white" /> : 
              <Play className="w-8 h-8 text-white" />
            }
          </button>
          <button 
            onClick={playNext}
            aria-label="Next song"
            className="transition-transform hover:scale-110"
          >
            <StepForward className="w-8 h-8 text-white" />
          </button>
        </div>

        <div className="mt-8 p-4 flex items-center space-x-4">
          {volumeProgress >= 0.6 ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : volumeProgress > 0 && volumeProgress < 0.6 ? (
            <Volume1 className="w-6 h-6 text-white" />
          ) : (
            <VolumeOff className="w-6 h-6 text-white" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volumeProgress}
            onChange={handleMusicVolume}
            className="flex-1 h-1 transition-all duration-300 ease-in-out accent-white outline-none border-none hover:accent-blue-400 hover:h-4"
            aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  )
}