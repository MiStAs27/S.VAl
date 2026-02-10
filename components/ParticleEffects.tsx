'use client'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

export default function ParticleEffects() {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const particleCount = isMobile ? 6 : 12
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-400 rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}