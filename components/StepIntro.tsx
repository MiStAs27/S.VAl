'use client'
import { motion } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'

interface StepIntroProps {
  isUnlocked: boolean
  onUnlock: () => void
}

export default function StepIntro({ isUnlocked, onUnlock }: StepIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-7xl mb-6">🎁</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Tengo algo para ti...
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
          He estado guardando esto en mi corazón por un tiempo. ¿Me permites compartirlo contigo?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-xl" />
        <button
          onClick={onUnlock}
          className="relative px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all transform hover:scale-105 text-xl flex items-center gap-3 mx-auto"
        >
          {isUnlocked ? (
            <>
              <Unlock size={24} />
              Abriendo sorpresa...
            </>
          ) : (
            <>
              <Lock size={24} />
              Descubrir Mi Sorpresa
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  )
}