import { Music, Pencil, Play, Search, StepBack, StepForward } from "lucide-react"

export default function App() {
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
              <button className="ml-auto bg-black p-2 rounded-full bg-opacity-60"><Pencil className="w-5 h-5 text-white" /></button>
            </div>
            <span className="text-lg font-outfit px-1 text-neutral-200">Here's your music library</span>
          </div>

          <div className="w-full h-60 bg-black bg-opacity-10 space-y-1 p-2">

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

            <div className="w-full h-14 flex flex-row items-center p-4 bg-transparent rounded-sm hover:bg-white hover:bg-opacity-10">
              <div className="flex flex-row items-center space-x-4">
                <span className="text-white font-outfit">1</span>
                <div className="flex flex-row items-center space-x-2">
                  <img src="https://cdn-images.dzcdn.net/images/cover/b4edc0fc32f430870375f8fb8f825ee7/1900x1900-000000-80-0-0.jpg" className="max-w-10 max-h-10"/>
                  <div className="flex flex-col -space-y-1 font-outfit">
                    <span className="text-white">Goosebumps</span>
                    <span className="text-white text-opacity-80 text-sm">Travis Scott</span>
                  </div>
                </div>
              </div>
              <span className="font-outfit text-white text-opacity-80 ml-auto"> 3:11 </span>
            </div>

          </div>
        </div>
      </div>

      <footer className="w-full h-20 flex flex-row items-center justify-center bg-black border-t-2">
        <div className="flex flex-row items-center space-x-4">
          <button><StepBack className="w-5 h-5 text-white" /></button>
          <button className="bg-blue-400 p-2 rounded-full"><Play className="w-5 h-5 text-white fill-white" /></button>
          <button><StepForward className="w-5 h-5 text-white" /></button>
        </div>
      </footer>
    </main>
  )
}