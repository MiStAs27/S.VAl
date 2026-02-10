'use client'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface NavigationFooterProps {
  currentStep: number
  onPrev: () => void
  onNext: () => void
  onHome: () => void
}

export default function NavigationFooter({ currentStep, onPrev, onNext, onHome }: NavigationFooterProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className="flex justify-between items-center mt-6 md:mt-8 lg:mt-12 pt-3 md:pt-4 lg:pt-6 border-t border-white/10">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all min-h-[36px] md:min-h-[40px] ${
          currentStep === 0
            ? "opacity-30 cursor-not-allowed"
            : "active:bg-white/10"
        }`}
      >
        <ArrowLeft size={isMobile ? 16 : 20} />
        {!isMobile && <span className="text-sm">Anterior</span>}
      </button>

       <button
        onClick={onHome}
        className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full active:bg-white/10 transition-all min-h-[36px] md:min-h-[40px]"
      >
        <Home size={isMobile ? 16 : 18} />
        {!isMobile && <span className="text-sm">Inicio</span>}
      </button>

      <button
        onClick={onNext}
        disabled={currentStep === 2}
        className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all min-h-[36px] md:min-h-[40px] ${
          currentStep === 2
            ? "opacity-30 cursor-not-allowed"
            : "active:bg-white/10"
        }`}
      >
        {!isMobile && <span className="text-sm">Siguiente</span>}
        <ArrowRight size={isMobile ? 16 : 20} />
      </button>
    </div>
  )
}