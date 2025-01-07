import { Music, Pause, Pencil, Play, Plus, Search, StepBack, StepForward } from "lucide-react"
import { useState, useEffect, useRef } from "react";
import data from './data/user-data.json'

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(data[0])
  const [waveVisible, setWaveVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animateRef = useRef<number>()
  const [audioInitialized, setAudioInitialized] = useState(false)
  const lastDataArrayRef = useRef<Uint8Array | null>(null)

  function togglePlayerState() {
    if (isPlaying) {
      setIsPlaying(false)
      setWaveVisible(false)
    } else {
      setIsPlaying(true)
      setWaveVisible(true)
    }
  }

  function songWaves() {
    if (analyserRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) return

      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyserRef.current.getByteFrequencyData(dataArray)

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

      animateRef.current = requestAnimationFrame(songWaves)
    }
  }

  const initializeAudio = () => {
    if (!audioInitialized && audioRef.current) {
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
      
      setAudioInitialized(true)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      initializeAudio()
      audioRef.current?.play()
      songWaves()
    } else {
      audioRef.current?.pause()
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong["music-source"]
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSong])

  useEffect(() => {
    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current)
      }
    }
  }, [])

  return (
    <main className="w-full h-screen flex flex-col bg-black space-y-4">
      <header className="w-full flex flex-row items-center justify-between h-16 shadow-md shadow-carbon-black">
        <div className="flex items-center justify-center m-4">
          <Music className="w-10 h-10 text-white" />
        </div>

        <div className="group w-auto flex items-center justify-center bg-carbon-black rounded-2xl space-x-4 pl-4 mr-4 transition-all duration-300 focus-within:ring-1 focus-within:ring-white hover:brightness-125">
          <Search className="text-neutral-500 transition-all duration-300 cursor-pointer group-hover:text-white group-focus-within:text-white" />
          <input
            type="search"
            placeholder="What to listen to today?"
            className="bg-carbon-black w-60 p-2 text-white rounded-r-2xl outline-none placeholder:text-neutral-400 font-outfit"
          />
        </div>
      </header>

      <div className="w-full h-full flex flex-col p-2">
        <div className="w-full h-full flex flex-col bg-gradient-to-b from-blue-400 to-65% to-stone-950 backdrop-blur-md rounded-md overflow-y-auto scroll-bar">
          <div className="w-full flex flex-col p-4">
            <div className="w-full flex flex-row items-center">
              <span className="text-[3rem] font-outfit text-white font-extrabold">Your Musics</span>
              <div className="flex flex-row items-center ml-auto space-x-4">

              <button className="group ml-auto bg-black p-2 rounded-full bg-opacity-60 shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                <Plus className="w-5 h-5 text-white transition-all duration-500 ease-in-out group-hover:rotate-180 group-hover:scale-105" />
              </button>

              <button className="ml-auto bg-black p-2 rounded-full bg-opacity-60 shadow-lg">
                <Pencil className="w-5 h-5 text-white" />
              </button>

              </div>
            </div>
            <span className="text-lg font-outfit px-1 text-neutral-200">Here's your music library</span>
          </div>

          <div className="w-full h-60 bg-black bg-opacity-10 space-y-1 p-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10"
                onClick={() => {
                  setCurrentSong(item)
                  setIsPlaying(true)
                  setWaveVisible(true)
                }}
              >
                <div className="flex flex-row items-center space-x-4">
                  <span className="text-white font-outfit">{item.id}</span>
                  <div className="flex flex-row items-center space-x-2">
                    <img src={item["music-cover"]} className="max-w-10 max-h-10" alt={item["music-name"]} />
                    <div className="flex flex-col -space-y-1 font-outfit">
                      <span className="text-white">{item["music-name"]}</span>
                      <span className="text-white text-opacity-80 text-sm">{item["music-author"]}</span>
                    </div>
                  </div>
                </div>
                <span className="font-outfit text-white text-opacity-80 ml-auto">
                  {item["music-duration"]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`transform transition-all duration-300 ease-in-out ${waveVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-8 bg-transparent"
          width={window.innerWidth}
          height={32}
        />
      </div>

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false)
          setWaveVisible(false)
        }}
      />

      <footer className="w-full h-20 flex flex-row items-center justify-between bg-black border-t-2">
        <div className="flex flex-row items-center mx-4 space-x-4">
          <img src={currentSong["music-cover"]} className="max-w-10 max-h-10" alt={currentSong["music-name"]} />
          <div className="flex flex-col font-outfit">
            <span className="text-base text-white cursor-pointer hover:underline">{currentSong["music-name"]}</span>
            <span className="text-xs text-white text-opacity-80 cursor-pointer hover:underline">{currentSong["music-author"]}</span>
          </div>
        </div>
          <div className="flex flex-row mx-4 items-center space-x-4">
            <button><StepBack className="w-5 h-5 text-white" /></button>
            <button
              className="bg-blue-400 p-2 rounded-full transition-all duration-200 hover:bg-blue-900"
              onClick={togglePlayerState}
            >
              {!isPlaying ?
                <Play className="w-5 h-5 text-white fill-white" /> :
                <Pause className="w-5 h-5 text-white fill-white" />
              }
            </button>
            <button><StepForward className="w-5 h-5 text-white" /></button>
          </div>
      </footer>
    </main>
  )
}