'use client'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

export default function FallingPetals() {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const petals = Array.from({ length: isMobile ? 6 : 10 }) // Crea 10 pétalos en móvil, 15 en escritorio

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -10, x: Math.random() * 100 + 'vw', opacity: 0 }}
          animate={{ 
            y: '110vh', 
            x: (Math.random() * 100 - 10) + 'vw',
            rotate: 360,
            opacity: [0, 1, 1, 0] 
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10 
          }}
          className="absolute text-red-500 text-xl md:text-2xl"
        >
          🌸
        </motion.div>
      ))}
    </div>
  )
}