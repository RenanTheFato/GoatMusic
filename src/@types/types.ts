export interface Musics {
  id: string,
  name: string,
  author: string,
  duration: string,
  coverPath: string,
  audioPath: string,
}

export interface TransformedMusic {
  id: string,
  "music-name": string,
  "music-author": string,
  "music-duration": string,
  "music-cover": string,
  "music-source": string,
}