'use client'
import { motion } from 'framer-motion'
import { Sparkles, Music } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface FloatingControlsProps {
  show3DScene: boolean
  onToggle3DScene: () => void
}

export default function FloatingControls({ show3DScene, onToggle3DScene }: FloatingControlsProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const playMusic = () => {
    const audio = new Audio('/music/special-song.mp3')
    audio.play().catch(() => {
      alert("🎵 Agrega tu canción especial en /public/music/special-song.mp3")
    })
  }

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} flex gap-2 md:gap-3 z-20`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle3DScene}
        className={`p-2.5 md:p-3 rounded-full border transition-all min-h-[40px] min-w-[40px] md:min-h-[44px] md:min-w-[44px] flex items-center justify-center ${
          show3DScene 
            ? "bg-purple-600 border-purple-400 text-white" 
            : "bg-white/10 border-white/20 text-pink-400"
        }`}
        title={show3DScene ? "Desactivar universo 3D" : "Activar universo 3D"}
      >
        <Sparkles size={isMobile ? 18 : 22} />
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={playMusic}
        className="p-2.5 md:p-3 bg-white/10 rounded-full border border-pink-400/30 min-h-[40px] min-w-[40px] md:min-h-[44px] md:min-w-[44px] flex items-center justify-center"
        title="Tu canción especial"
      >
        <Music size={isMobile ? 18 : 22} />
      </motion.button>
    </div>
  )
}