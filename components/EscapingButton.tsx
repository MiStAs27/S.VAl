'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function EscapingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovered) return
    
    const button = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - button.left - button.width / 2
    const y = e.clientY - button.top - button.height / 2
    
    if (Math.abs(x) < 50 && Math.abs(y) < 50) {
      const newX = Math.random() * 200 - 100
      const newY = Math.random() * 200 - 100
      setPosition({ x: newX, y: newY })
    }
  }

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 })
    setTimeout(() => setIsHovered(true), 1000)
  }

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={resetPosition}
      className="px-10 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-full shadow-lg shadow-gray-500/50 hover:shadow-gray-500/80 transition-all flex items-center gap-3 text-lg min-w-[200px] justify-center relative"
    >
      <span className="relative z-10">😅 Tal vez después...</span>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"
        >
          ¡Trata de atraparme!
        </motion.div>
      )}
    </motion.button>
  )
}