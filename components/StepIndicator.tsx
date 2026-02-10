'use client'
import { motion } from 'framer-motion'

interface StepIndicatorProps {
  steps: Array<{ title: string; icon: string }>
  currentStep: number
  onStepClick: (index: number) => void
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between bg-black/60 backdrop-blur-md rounded-full px-3 py-2 md:px-6 md:py-3 border border-white/10 w-full max-w-[95vw]">
      {steps.map((step, index) => (
        <motion.div key={index} className="flex items-center flex-1">
          <button
            onClick={() => onStepClick(index)}
            className={`flex items-center gap-1 md:gap-2 transition-all w-full justify-center min-h-[44px] ${
              currentStep === index 
                ? "text-pink-300" 
                : currentStep > index
                ? "text-green-400 opacity-70"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border ${
              currentStep === index 
                ? "border-pink-500 bg-pink-500/20" 
                : currentStep > index
                ? "border-green-500 bg-green-500/20"
                : "border-gray-600"
            }`}>
              <span className='text-xs md:text-base'>
              {currentStep > index ? "✓" : step.icon}
              </span>
            </div>
            <span className="hidden md:inline text-xs md:text-sm font-medium truncate max-w-[60px] md:max-w-none">
              {step.title}
            </span>
          </button>
          {index < steps.length - 1 && (
            <div className="" />
          )}
        </motion.div>
      ))}
    </div>
  )
}