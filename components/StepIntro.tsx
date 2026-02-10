'use client'
import { motion } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface StepIntroProps {
  isUnlocked: boolean
  onUnlock: () => void
}

export default function StepIntro({ isUnlocked, onUnlock }: StepIntroProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center px-2"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 md:mb-8"
      >
        <div className="text-6xl md:text-7xl mb-4 md:mb-6">🎁</div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Para ti Adelaida...
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-lg mx-auto px-2">
          Guarde esto en mi corazón por un tiempo. ¿Me permites compartirlo contigo?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent blur-xl" />
        <button
          onClick={onUnlock}
          className="relative px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all active:scale-95 md:hover:scale-105 text-base md:text-lg lg:text-xl flex items-center gap-2 md:gap-3 mx-auto min-h-[48px] w-full max-w-[90vw] md:max-w-md"
        >
          {isUnlocked ? (
            <>
              <Unlock size={isMobile ? 20 : 24} />
              Abriendo sorpresa...
            </>
          ) : (
            <>
              <Lock size={isMobile ? 20 : 24} />
              Descubrir Mi Sorpresa
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  )
}