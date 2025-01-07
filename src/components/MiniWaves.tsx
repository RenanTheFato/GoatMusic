import { useRef, useEffect } from "react"

export function MiniWaves({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const bars = 3
      const width = canvas.width / (bars * 2)
      
      for (let i = 0; i < bars; i++) {
        const height = Math.sin(Date.now() / 200 + i) * 10 + 15
        const x = i * (width * 2) + width/2
        
        ctx.fillStyle = 'rgb(37, 99, 235)'
        ctx.fillRect(x, (canvas.height - height) / 2, width, height)
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      width={20}
      height={20}
      className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}