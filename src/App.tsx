import { Music, Pause, Play, Plus, Search, Shuffle, StepBack, StepForward, Volume1, Volume2, VolumeOff, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { TransformedMusic, Musics } from "./@types/types"
import MobilePlayerOverlay from "./components/MobilePlayer"
import { MiniWaves } from "./components/MiniWaves"
import AddMusics from "./components/AddMusics"
import axios from 'axios'

export default function App() {
  const [isAddMusicCardVisible, setIsAddMusicCardVisible] = useState(false)
  const [isMobilePlayerVisible, setIsMobilePlayerVisible] = useState(false)
  const [isMusicCardVisible, setIsMusicCardVisible] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRandom, setIsRandom] = useState(false)

  const [volumeProgress, setVolumeProgress] = useState(0)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)

  const [waveVisible, setWaveVisible] = useState(true)

  const [musicData, setMusicData] = useState<TransformedMusic[]>([])
  const [currentSong, setCurrentSong] = useState<TransformedMusic>({
    id: '',
    "music-name": '',
    "music-author": '',
    "music-duration": '',
    "music-cover": '',
    "music-source": ''
  })

  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastDataArrayRef = useRef<Uint8Array | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animateRef = useRef<number>()

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

  async function fetchMusicData() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.get(`${apiUrl}/api/musics`)
      if (response.status === 200) {
        const transformedData = response.data.map((music: Musics) => ({
          id: music.id,
          "music-name": music.name,
          "music-author": music.author,
          "music-duration": music.duration,
          "music-cover": `${apiUrl}${music.coverPath}`,
          "music-source": `${apiUrl}${music.audioPath}`
        }))

        setMusicData(transformedData)

        if (!currentSong.id && transformedData.length > 0) {
          setCurrentSong(transformedData[0])
        }
      }
    } catch (error) {
      console.error('Error fetching music data:', error)
    }
  }

  async function handleMusicAdded() {
    const isCurrentlyPlaying = isPlaying
    await fetchMusicData()

    if (isCurrentlyPlaying) {
      setIsPlaying(true)
      setWaveVisible(true)
    }
  }

  useEffect(() => {
    fetchMusicData()
  }, [])

  function formatMusicTime(duration: number) {
    if (!duration || isNaN(duration)) {
      return "0:00";
    }
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${minutes}:${formattedSeconds}`
  }

  function handleMusicProgress(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return
    const newTime = parseFloat(e.target.value)
    if (!isNaN(newTime)) {
      audioRef.current.currentTime = newTime
      setAudioProgress(newTime)
    }
  }

  function handleMusicTime() {
    if (!audioRef.current) return

    const currentTime = audioRef.current.currentTime
    const duration = audioRef.current.duration

    if (!isNaN(currentTime)) {
      setAudioProgress(currentTime)
    }

    if (!isNaN(duration)) {
      setAudioDuration(duration)
    }
  }

  function handleMusicVolume(e: any) {
    if (!audioRef.current) return
    audioRef.current.volume = e.target.value
    setVolumeProgress(e.target.value)
  }

  function togglePlayerState() {
    if (isPlaying) {
      setIsPlaying(false)
      setWaveVisible(false)
    } else {
      setIsPlaying(true)
      setWaveVisible(true)
    }
  }

  function resetAudioState() {
    setAudioProgress(0)
    setAudioDuration(0)
  }

  function toggleMusicCard() {
    setIsMusicCardVisible(!isMusicCardVisible)
  }

  function toggleAddMusicCard() {
    setIsAddMusicCardVisible(!isAddMusicCardVisible)
  }

  function handleRandom() {
    setIsRandom(!isRandom)
  }

  function playNext() {
    if (musicData.length === 0) return

    const currentIndex = musicData.findIndex(song => song.id === currentSong.id)

    if (isRandom) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * musicData.length)
      } while (randomIndex === currentIndex)
      setCurrentSong(musicData[randomIndex])
    } else {
      const nextIndex = currentIndex === musicData.length - 1 ? 0 : currentIndex + 1
      setCurrentSong(musicData[nextIndex])
    }

    resetAudioState()
    setIsPlaying(true)
    setWaveVisible(true)
  }

  function playPrev() {
    if (musicData.length === 0) return

    const currentIndex = musicData.findIndex(song => song.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? musicData.length - 1 : currentIndex - 1
    setCurrentSong(musicData[prevIndex])

    resetAudioState()
    setIsPlaying(true)
    setWaveVisible(true)
  }

  function initializeAudio() {
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


  const filteredMusicData = musicData.filter((music) =>
    music["music-name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
    music["music-author"].toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.crossOrigin = 'anonymous'
      audioRef.current.src = currentSong["music-source"]

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setAudioDuration(audioRef.current.duration)
          setAudioProgress(0)
        }
      }

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)

      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
          setIsPlaying(false)
        })
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
      }
    }
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.addEventListener("timeupdate", handleMusicTime)
    audio.addEventListener("loadedmetadata", handleMusicTime)

    return () => {
      audio.removeEventListener("timeupdate", handleMusicTime)
      audio.removeEventListener("loadedmetadata", handleMusicTime)
    }
  }, [])

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
    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const defaultVolume = 0.5
    setVolumeProgress(defaultVolume)

    if (audioRef.current) {
      audioRef.current.volume = defaultVolume
    }
  }, [])

  return (
    <div>

      <MobilePlayerOverlay
        isVisible={isMobilePlayerVisible}
        onClose={() => setIsMobilePlayerVisible(false)}
        currentSong={currentSong}
        isPlaying={isPlaying}
        audioProgress={audioProgress}
        audioDuration={audioDuration}
        volumeProgress={volumeProgress}
        handleMusicProgress={handleMusicProgress}
        handleMusicVolume={handleMusicVolume}
        togglePlayerState={togglePlayerState}
        formatMusicTime={formatMusicTime}
        playNext={playNext}
        playPrev={playPrev}
        analyser={analyserRef.current}
      />

      <AddMusics
        isVisible={isAddMusicCardVisible}
        onClose={() => setIsAddMusicCardVisible(false)}
        onMusicAdded={handleMusicAdded}
      />

      <main className="w-full h-screen flex flex-col bg-black space-y-4 relative">


        <header className="w-full flex flex-row items-center justify-between h-16 shadow-md shadow-carbon-black">
          <div className="flex flex-row space-x-4 items-center justify-center m-4">
            <Music className="w-10 h-10 text-white" />
            <span className="text-white font-outfit text-3xl font-extrabold">G O A T</span>
          </div>

          <div className="group w-auto flex items-center justify-center bg-carbon-black rounded-2xl space-x-4 pl-4 mr-4 transition-all duration-300 focus-within:ring-1 focus-within:ring-white hover:brightness-125">
            <Search className="text-neutral-500 transition-all duration-300 cursor-pointer group-hover:text-white group-focus-within:text-white" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Music"
              placeholder="What to listen to today?"
              className="bg-carbon-black w-60 p-2 text-white rounded-r-2xl outline-none placeholder:text-neutral-400 font-outfit"
            />
          </div>
        </header>


        <div className="w-full h-full flex flex-row p-2 select-none space-x-4">
          <div className={`w-full h-full flex flex-col bg-gradient-to-b from-blue-400 to-65% to-stone-950 backdrop-blur-md rounded-md overflow-y-auto scroll-bar transform transition-all duration-500 ease-in-out ${isMusicCardVisible ? 'md:w-[80vw]' : 'w-full'}`}>
            <div className="w-full flex flex-col p-4">
              <div className="w-full flex flex-row items-center">
                <span className="text-[3rem] font-outfit text-white font-extrabold">Your Musics</span>
                <div className="flex flex-row items-center ml-auto space-x-4">

                  <button
                    className="group ml-auto bg-black p-2 rounded-full bg-opacity-60 shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
                    aria-label="Add New Music"
                    onClick={toggleAddMusicCard}>
                    <Plus className="w-5 h-5 text-white transition-all duration-500 ease-in-out group-hover:rotate-180 group-hover:scale-105" />
                  </button>

                </div>
              </div>
              <span className="text-lg font-outfit px-1 text-neutral-200">Here's your music library</span>
            </div>

            <div className="w-full h-60 bg-black bg-opacity-10 space-y-1 p-2">
              {filteredMusicData.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10"
                  onClick={() => {
                    setCurrentSong(item)
                    setIsPlaying(true)
                    setWaveVisible(true)
                  }}
                >
                  <div className="flex flex-row items-center space-x-6">
                    <div className="flex items-center justify-center w-12 -mx-6">
                      {currentSong.id === item.id && isPlaying ? (
                        <MiniWaves isActive={true} />
                      ) : (
                        <span className={`${currentSong["id"] === item["id"] ? "text-blue-600 font-semibold" : "text-white"} font-outfit`}>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                      <img src={item["music-cover"]} className="max-w-10 max-h-10" alt={item["music-name"]} />
                      <div className="flex flex-col -space-y-1 font-outfit">
                        <span className={`${currentSong["id"] === item["id"] ? "text-blue-600 font-semibold" : "text-white"}`}>{item["music-name"]}</span>
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

          <div className={`fixed md:relative right-0 top-0 h-full md:h-auto w-full md:w-[35vw] bg-carbon-black contrast-125 rounded-lg space-y-4 transform transition-all duration-500 ease-in-out ${isMusicCardVisible ? 'translate-x-0 opacity-100 md:flex md:flex-col' : 'translate-x-full opacity-0 md:hidden'} hidden md:flex flex-col`}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full flex flex-row items-center p-4">
                <div className="flex flex-row space-x-4">
                  <span className="font-outfit text-white font-extrabold">Now Playing</span>
                  <MiniWaves isActive={true} />
                </div>
                <div
                  className="flex flex-row items-center ml-auto cursor-pointer"
                  onClick={toggleMusicCard}
                >
                  <X className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={currentSong["music-cover"]}
                  className={`md:w-60 md:h-60 lg:w-72 lg:h-72 max-w-80 max-h-80 hover:brightness-110 transform transition-all duration-500 ease-in-out ${isMusicCardVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-90'}`}
                  alt={currentSong["music-name"]}
                />
              </div>
            </div>

            <div className="flex flex-col mx-4">
              <span className="text-base font-bold md:text-xl text-white cursor-pointer hover:underline">{currentSong["music-name"]}</span>
              <span className="text-xs font-bold md:text-base text-white text-opacity-80 cursor-pointer hover:underline">{currentSong["music-author"]}</span>
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
          onEnded={playNext}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setAudioProgress(audioRef.current.currentTime)
            }
          }}
        />

        <footer className="w-full p-4 flex flex-row items-center justify-between bg-black border-t-2 select-none">
          <div
            className="flex flex-row items-center mx-4 space-x-4"
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobilePlayerVisible(true)
              } else {
                toggleMusicCard()
              }
            }}>
            <img
              src={currentSong["music-cover"]}
              className="max-w-10 max-h-10 md:max-w-14 md:max-h-14 cursor-pointer"
              alt={currentSong["music-name"]}
            />
            <div className="flex flex-col font-outfit w-20 max-w-20">
              <span className="text-base whitespace-nowrap md:text-lg text-white cursor-pointer hover:underline">{currentSong["music-name"]}</span>
              <span className="text-xs whitespace-nowrap md:text-sm text-white text-opacity-80 cursor-pointer hover:underline">{currentSong["music-author"]}</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="flex flex-row items-center space-x-3">
              <button
                onClick={handleRandom}
                aria-label="Set Shuffle Music Queue">
                <Shuffle className={`w-5 h-5 ${isRandom ? "text-blue-500" : 'text-white'} hover:scale-105`} />
              </button>

              <button
                onClick={playPrev}
                aria-label="Previous song">
                <StepBack className="w-5 h-5 text-white hover:fill-white" />
              </button>

              <button
                className="bg-blue-400 p-2 rounded-full transition-all duration-200 hover:bg-blue-900"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlayerState}>
                {!isPlaying ?
                  <Play className="w-5 h-5 text-white fill-white" /> :
                  <Pause className="w-5 h-5 text-white fill-white" />
                }
              </button>

              <button
                onClick={playNext}
                aria-label="Next song">
                <StepForward className="w-5 h-5 text-white hover:fill-white" />
              </button>

            </div>

            <div className="hidden md:visible md:flex flex-row items-center justify-center space-x-4">
              <span className="font-outfit text-white">{formatMusicTime(audioProgress)}</span>
              <input
                type="range"
                min={0}
                max={audioDuration || 0}
                value={audioProgress || 0}
                onChange={handleMusicProgress}
                className="w-72 h-1 transition-all duration-300 ease-in-out accent-white outline-none border-none hover:accent-blue-400 hover:h-4"
              />
              <span className="font-outfit text-white">{formatMusicTime(audioDuration)}</span>
            </div>
          </div>

          <div className="hidden md:flex flex-row md:mx-4 items-center space-x-4">
            <div className="group flex flex-row items-center space-x-2">
              {volumeProgress >= 0.6 ? (
                <Volume2 className="w-5 h-5 text-neutral-500 transition-all duration-300 cursor-pointer group-hover:text-white" />
              ) : volumeProgress > 0 && volumeProgress < 0.6 ? (
                <Volume1 className="w-5 h-5 text-neutral-500 transition-all duration-300 cursor-pointer group-hover:text-white" />
              ) : (
                <VolumeOff className="w-5 h-5 text-neutral-500 transition-all duration-300 cursor-pointer group-hover:text-white" />
              )}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volumeProgress}
                aria-label="Volume control"
                onChange={handleMusicVolume}
                className="w-32 h-1 transition-all duration-300 ease-in-out accent-white outline-none border-none hover:accent-blue-400 hover:h-4"
              />
            </div>
          </div>

        </footer>
      </main>
    </div>
  )
}