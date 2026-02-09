'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'

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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTextIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-4">
            {texts[currentTextIndex].title}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic">
            {texts[currentTextIndex].content}
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {texts.map((_, index) => (
            <button
              key={index}
              onClick={() => onTextChange(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTextIndex 
                  ? "bg-pink-500 scale-125" 
                  : "bg-pink-900 hover:bg-pink-700"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-6 rounded-2xl border border-pink-500/30 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Heart size={20} className="text-pink-400" />
            It's you
          </h3>
          <p className="text-gray-300 mb-4">
            You were my purest connection; I felt fear and hope at the same time. I thank you for clearing away that fog. I want you to be able to reach the stars with your own hands and to bring them down, and for absolutely no one to hurt you, because whoever does, then they cease to be a pacifist.
          </p>
          
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3"
        >
          Continuar al Siguiente Paso
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}