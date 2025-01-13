# Goat Music Server

<div>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/json-%23000000.svg?style=for-the-badge&logo=json&logoColor=white">
</div>

## 📋 About The Project

A simple server that integrates receiving and storing files from the **[Goat Music](https://github.com/RenanTheFato/GoatMusic)** project with Typescript and Fastify.


## 🚀 Features

- File upload and storage:
  - Images (e.g., album covers)
  - Music files (e.g., songs, audio recordings)
- Fast and efficient handling of HTTP requests
- Scalable structure for future enhancements

## 🛠️ Dependency

> [!IMPORTANT]  
> To run this project you need a basic server to storage your files **[Goat Music Server](https://github.com/RenanTheFato/GoatMusicServer)**

## 💻 Installation

### 1. Clone the repository
```bash
git clone https://github.com/RenanTheFato/GoatMusic.git
cd GoatMusic
```

### 2. Install the dependencies
```bash
npm install
```

### 3. Set the environment variables

> .env.example  ──> .env

### 4. Scripts available

```bash
# Development
npm run dev

# Build
npm run build

# Production Preview
npm run preview

```
## 📁 Project Structure

```
GoatMusicServer/
├──public/
|    └── icon.svg
├── src/
|    ├──@types/
│    |    └── types.ts
|    ├──components/
│    │   ├── AddMusics.tsx
│    │   ├── MiniWaves.tsx
│    │   └── MobilePlayer.tsx
|    ├──service/
│    │   └── api.ts
|    ├── App.tsx
|    ├── index.css
|    ├── main.tsx
|    ├── vite-env.d.ts
├── .env-example
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👥 Contribution

### Share the project


## 📧 Contact

Renan - [GitHub](https://github.com/RenanTheFato)

Email - <a href="mailto:renan.santana007@hotmail.com">renan.santana007@hotmail.com</a>

Project Link: [https://github.com/RenanTheFato/GoatMusic](https://github.com/RenanTheFato/GoatMusic)
