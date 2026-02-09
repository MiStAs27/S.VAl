'use client'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'

interface NavigationFooterProps {
  currentStep: number
  onPrev: () => void
  onNext: () => void
  onHome: () => void
}

export default function NavigationFooter({ currentStep, onPrev, onNext, onHome }: NavigationFooterProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
          currentStep === 0
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-white/10"
        }`}
      >
        <ArrowLeft size={20} />
        Anterior
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm"
        >
          <Home size={16} />
          Inicio
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={currentStep === 2}
        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
          currentStep === 2
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-white/10"
        }`}
      >
        Siguiente
        <ArrowRight size={20} />
      </button>
    </div>
  )
}