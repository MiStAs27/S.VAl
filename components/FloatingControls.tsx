'use client'
import { motion } from 'framer-motion'
import { Sparkles, Music } from 'lucide-react'

interface FloatingControlsProps {
  show3DScene: boolean
  onToggle3DScene: () => void
}

export default function FloatingControls({ show3DScene, onToggle3DScene }: FloatingControlsProps) {
  const playMusic = () => {
    const audio = new Audio('/music/special-song.mp3')
    audio.play().catch(() => {
      alert("🎵 Agrega tu canción especial en /public/music/special-song.mp3")
    })
  }

  return (
    <div className="fixed bottom-6 right-6 flex gap-4 z-20">
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle3DScene}
        className={`p-3 rounded-full border transition-all ${
          show3DScene 
            ? "bg-purple-600 border-purple-400 text-white" 
            : "bg-white/10 border-white/20 text-pink-400 hover:bg-white/20"
        }`}
        title={show3DScene ? "Desactivar universo 3D" : "Activar universo 3D"}
      >
        <Sparkles size={24} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={playMusic}
        className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all text-pink-400 border border-pink-400/30"
        title="Tu canción especial"
      >
        <Music size={24} />
      </motion.button>
    </div>
  )
}