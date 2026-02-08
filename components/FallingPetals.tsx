'use client'
import { motion } from 'framer-motion'

export default function FallingPetals() {
  const petals = Array.from({ length: 15 }) // Crea 15 pétalos

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
          className="absolute text-red-500 text-2xl"
        >
          🌸
        </motion.div>
      ))}
    </div>
  )
}