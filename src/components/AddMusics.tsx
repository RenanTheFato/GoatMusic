import { AudioLines, Image, Music4, Trash, X } from "lucide-react"
import { useRef, useState } from "react"

type AddMusicsProps = {
  isVisible: boolean,
  onClose: () => void
}

export default function AddMusics({ isVisible, onClose }: AddMusicsProps) {
  const coverMusicRef = useRef<HTMLInputElement | null>(null)
  const audioMusicRef = useRef<HTMLInputElement | null>(null)

  const [coverMusic, setCoverMusic] = useState<File | null>(null)
  const [audioMusic, setAudioMusic] = useState<File | null>(null)
  const [coverError, setCoverError] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [coverNotification, setCoverNotification] = useState<string | null>(null)
  const [audioNotification, setAudioNotification] = useState<string | null>(null)
  const [audioDuration, setAudioDuration] = useState<string>("")

  const allowedCoverTypes = ['image/jpeg', 'image/png']
  const allowedAudioTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav']

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  function showCoverNotification(message: string) {
    setCoverNotification(message)
    setTimeout(() => setCoverNotification(null), 3000)
  }

  function validateFile(file: File): boolean {
    if (!allowedCoverTypes.includes(file.type)) {
      setCoverError('Please select a valid image file (JPEG or PNG)')
      showCoverNotification('Please select a valid image file (JPEG or PNG)')
      return false
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setCoverError('File size must be less than 5MB')
      showCoverNotification('File size must be less than 5MB')
      return false
    }

    return true
  }

  function handleChangeMusicCover(event: React.ChangeEvent<HTMLInputElement>) {
    setCoverError(null)

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      if (validateFile(file)) {
        setCoverMusic(file);
      } else {
        if (coverMusicRef.current) {
          coverMusicRef.current.value = ''
        }
        setCoverMusic(null)
      }
    }
  }

  function handleChooseMusicCover() {
    coverMusicRef.current?.click()
  }

  function handleRemoveMusicCover() {
    setCoverMusic(null)
    setCoverError(null)
    if (coverMusicRef.current) {
      coverMusicRef.current.value = ''
    }
  }

  function showAudioNotification(message: string) {
    setAudioNotification(message)
    setTimeout(() => setAudioNotification(null), 3000)
  }

  function validateAudioFile(file: File): boolean {
    if (!allowedAudioTypes.includes(file.type)) {
      setAudioError('Please select a valid image file (MP3, OGG or WAV)')
      showAudioNotification('Please select a valid image file (MP3, OGG or WAV)')
      return false
    }

    return true
  }

  function handleChangeMusicAudio(event: React.ChangeEvent<HTMLInputElement>) {
    setAudioError(null)

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]

      if (validateAudioFile(file)) {
        setAudioMusic(file);

        const audioUrl = URL.createObjectURL(file)
        const audio = new Audio(audioUrl)

        audio.onloadedmetadata = () => {
          const duration = formatDuration(audio.duration)

          setAudioDuration(duration)

          URL.revokeObjectURL(audioUrl)
        }
      } else {
        if (audioMusicRef.current) {
          audioMusicRef.current.value = ''
        }
        setAudioMusic(null)
        setAudioDuration("")
      }
    }
  }

  function handleChooseMusicAudio() {
    audioMusicRef.current?.click();
  }

  function handleRemoveMusicAudio() {
    setAudioMusic(null)
    setAudioError(null)
    setAudioDuration("")
    if (audioMusicRef.current) {
      audioMusicRef.current.value = ''
    }
  }

  return (
    <div className={`fixed inset-0 z-50 bg-carbon-black contrast-125 transform transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
      {coverNotification && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-left">
          <div className="p-4 bg-red-500 text-white rounded-lg shadow-lg">
            <p className="font-outfit">{coverNotification}</p>
          </div>
        </div>
      )}

      {audioNotification && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-left">
          <div className="p-4 bg-red-500 text-white rounded-lg shadow-lg">
            <p className="font-outfit">{audioNotification}</p>
          </div>
        </div>
      )}

      <div className={`w-full h-full flex flex-col p-4 items-center transform transition-all duration-500 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1/4 opacity-0'}`}>
        <div className="flex justify-between items-center p-4 w-full">
          <div className="w-6" />
          <span className="text-white font-outfit">Add Music</span>
          <button
            onClick={onClose}
            aria-label="Close player"
            className="transition-transform hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="w-full flex flex-col p-4 space-y-4 md:w-1/2">
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <label className="font-outfit text-white">Music Name</label>
              <input type="text" className="p-2 rounded-md outline-none bg-transparent transition-all duration-200 ease-in text-white ring-1 ring-white focus:ring-blue-500" />
            </div>

            <div className="flex flex-col space-y-4">
              <label className="font-outfit text-white">Music Author</label>
              <input type="text" className="p-2 rounded-md outline-none bg-transparent transition-all duration-200 ease-in text-white ring-1 ring-white focus:ring-blue-500" />
            </div>

            <div className="flex flex-col space-y-4">
              <label className="font-outfit text-white">Music Duration</label>
              <input
                disabled
                type="text"
                value={audioDuration}
                className="p-2 rounded-md outline-none bg-transparent transition-all duration-200 ease-in text-white ring-1 ring-white focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-white/10"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-between">
                <label className="font-outfit text-white">Music Cover</label>
                {coverError && (
                  <p className="text-red-500 text-sm font-outfit">{coverError}</p>
                )}
              </div>
              <div className={`rounded-md outline-none bg-transparent transition-all duration-300 ease-in-out text-white ring-1 ${coverError ? 'ring-red-500' : 'ring-white hover:ring-blue-500'}`}>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleChangeMusicCover}
                  ref={coverMusicRef}
                  className="hidden"
                />
                {coverMusic === null ? (
                  <button
                    type="button"
                    onClick={handleChooseMusicCover}
                    className="flex flex-row justify-center items-center p-2 w-full space-x-2"
                  >
                    <Image className="w-5 h-5 text-white" />
                    <span className="text-white font-outfit">Select the music cover...</span>
                  </button>
                ) : (
                  <div className="flex flex-row justify-between items-center p-2">
                    <span className="text-white font-outfit truncate">
                      {coverMusic.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveMusicCover}
                      className="transition-colors hover:text-red-500"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center justify-between">
                <label className="font-outfit text-white">Music Audio</label>
                {audioError && (
                  <p className="text-red-500 text-sm font-outfit">{audioError}</p>
                )}
              </div>
              <div className={`rounded-md outline-none bg-transparent transition-all duration-300 ease-in-out text-white ring-1 ${audioError ? 'ring-red-500' : 'ring-white hover:ring-blue-500'}`}>
                <input
                  type="file"
                  accept="audio/mpeg,audio/ogg,audio/wav"
                  onChange={handleChangeMusicAudio}
                  ref={audioMusicRef}
                  className="hidden"
                />
                {audioMusic === null ? (
                  <button
                    type="button"
                    onClick={handleChooseMusicAudio}
                    className="flex flex-row justify-center items-center p-2 w-full space-x-2"
                  >
                    <AudioLines className="w-5 h-5 text-white" />
                    <span className="text-white font-outfit">Select the music audio...</span>
                  </button>
                ) : (
                  <div className="flex flex-row justify-between items-center p-2">
                    <span className="text-white font-outfit truncate">
                      {audioMusic.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveMusicAudio}
                      className="transition-colors hover:text-red-500"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                )}

              </div>
            </div>

            <div className="w-full flex flex-col pt-12">
              <button
                type="submit"
                className="flex flex-row items-center justify-center space-x-2 bg-blue-500 p-2 rounded-lg transition-all duration-500 hover:scale-105"
              >
                <Music4 className="w-5 h-5 text-white" />
                <span className="font-outfit font-extrabold text-white">Send Music</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}