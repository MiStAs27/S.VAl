'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface TextItem {
  title: string
  content: string
}

interface StepMessagesProps {
  texts: TextItem[]
  currentTextIndex: number
  onTextChange: (index: number) => void
  onNext: () => void
}

export default function StepMessages({ texts, currentTextIndex, onTextChange, onNext }: StepMessagesProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTextIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-300 mb-3 md:mb-4">
            {texts[currentTextIndex].title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed italic px-2">
            {texts[currentTextIndex].content}
          </p>
        </motion.div>

        <div className="flex justify-center gap-1.5 md:gap-2 mb-6 md:mb-8">
          {texts.map((_, index) => (
            <button
              key={index}
              onClick={() => onTextChange(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentTextIndex 
                  ? "bg-pink-500 scale-110 md:scale-125" 
                  : "bg-pink-900 active:bg-pink-700"
              }`}
              aria-label={`Ir a texto ${index + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border border-pink-500/20 md:border-pink-500/30 mb-6 md:mb-8"
        >
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 justify-center md:justify-start">
            <Heart size={isMobile ? 18 : 20} className="text-pink-400" />
            It's you
          </h3>
          <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">
            You were my purest connection; I felt fear and hope at the same time. I thank you for clearing away that fog. I want you to be able to reach the stars with your own hands and to bring them down, and for absolutely no one to hurt you, because whoever does, then they cease to be a pacifist.
          </p>
          
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 min-h-[48px] text-sm md:text-base"
        >
          Continuar al Siguiente Paso
          <ArrowRight size={isMobile ? 18 : 20} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}