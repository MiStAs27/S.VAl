'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function EscapingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const mobileCheck = useMediaQuery({ maxWidth: 768 })
  
  useEffect(() => {
    setIsMobile(mobileCheck)
  }, [mobileCheck])

  const handleTouchStart = (e: React.TouchEvent) => {
    const button = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - button.left - button.width / 2
    const y = touch.clientY - button.top - button.height / 2
    
    if (Math.abs(x) < 60 && Math.abs(y) < 60) {
      const newX = Math.random() * 150 - 75
      const newY = Math.random() * 150 - 75
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return
    
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
  }

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onClick={resetPosition}
      className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-full shadow-lg shadow-gray-500/50 transition-all flex items-center gap-2 justify-center min-h-[44px] w-full text-sm md:text-base"
    >
      <span className="truncate">😅 Tal vez después...</span>
    </motion.button>
  )
}