'use client'
import { motion } from 'framer-motion'
import { Heart, Send } from 'lucide-react'
import confetti from 'canvas-confetti'
import EscapingButton from './EscapingButton'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

interface StepQuestionProps {
  showResponse: boolean
  onYes: () => void
  messages: string[]
  inputValue: string
  onInputChange: (value: string) => void
  onAddMessage: (e: React.FormEvent) => void
}

export default function StepQuestion({
  showResponse,
  onYes,
  messages,
  inputValue,
  onInputChange,
  onAddMessage
}: StepQuestionProps) {
  const [isCelebrating, setIsCelebrating] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handleCelebrate = () => {
    setIsCelebrating(true)
    confetti({
      particleCount: isMobile ? 150 : 300,
      spread: 160,
      origin: { y: 0.5 }
    })
    setTimeout(() => setIsCelebrating(false), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center w-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 md:mb-8"
      >
        <div className="text-5xl md:text-6xl mb-3 md:mb-4">💝</div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Sincerandome
        </h2>
        <p className="text-base md:text-xl text-gray-300 px-2">
          No supe cuando empezo. Solo se que deje de sentirme roto desde que tu voz me llamo por mi nombre. Me enseñaste a luchar, pero tambien a quedarme.
          y aunque me avergüence admitirlo... ya te habia elegido ade.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-pink-900/30 to-red-900/30 p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-pink-500/30 md:border-2 md:border-pink-500/50 mb-6 md:mb-8"
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6 leading-tight">
          ¿Me das el honor de ser tu San Valentín? 
        </h3>
        

        <div className="flex flex-col gap-4 md:flex-row md:gap-6 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
            className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/80 transition-all flex items-center gap-2 justify-center min-h-[48px] w-full md:w-auto text-sm md:text-base"
          >
            <Heart size={isMobile ? 20 : 24} fill="white" />
            SÍ
          </motion.button>
          
          <div className="w-full md:w-auto">
            <EscapingButton />
          </div>
        </div>
      </motion.div>

      {showResponse && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 md:mt-8 p-5 md:p-6 lg:p-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl md:rounded-3xl border border-emerald-500/50 shadow-xl shadow-emerald-900/20"
        >
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎉💖✨</div>
          <h4 className="text-xl md:text-2xl text-emerald-300 font-bold mb-3 md:mb-4">
            ¡Sabia que dirias que Si!
            jajajaja
          </h4>
          
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 md:mt-6"
          >
            <button
              onClick={handleCelebrate}
              disabled={isCelebrating}
              className="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all disabled:opacity-50 text-sm md:text-base w-full md:w-auto min-h-[44px]"
            >
              {isCelebrating ? '¡Celebrando!' : '¡Celebremos con más confeti! 🎊'}
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 md:mt-12"
      >
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Deja tu mensaje especial</h3>
        <form onSubmit={onAddMessage} className="flex flex-col sm:flex-row gap-2 mb-4 md:mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Escribe tu promesa de amor..."
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 md:px-6 md:py-3 focus:outline-none focus:border-pink-500 transition-colors placeholder-gray-400 text-sm md:text-base"
          />
          <button 
            type="submit" 
            className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Send size={isMobile ? 18 : 20}/>
          </button>
        </form>

        <div className="space-y-2 md:space-y-3 max-h-48 md:max-h-60 overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 p-3 md:p-4 rounded-xl border-l-4 border-pink-500"
            >
              <p className="text-gray-200 text-sm md:text-base">💌 {msg}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}