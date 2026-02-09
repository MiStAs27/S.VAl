'use client'
import { motion } from 'framer-motion'

interface StepIndicatorProps {
  steps: Array<{ title: string; icon: string }>
  currentStep: number
  onStepClick: (index: number) => void
}

export default function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
      {steps.map((step, index) => (
        <motion.div key={index} className="flex items-center gap-2">
          <button
            onClick={() => onStepClick(index)}
            className={`flex items-center gap-2 transition-all ${
              currentStep === index 
                ? "text-pink-400" 
                : currentStep > index
                ? "text-green-400 opacity-70"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              currentStep === index 
                ? "border-pink-500 bg-pink-500/20" 
                : currentStep > index
                ? "border-green-500 bg-green-500/20"
                : "border-gray-600"
            }`}>
              {currentStep > index ? "✓" : step.icon}
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              {step.title}
            </span>
          </button>
          {index < steps.length - 1 && (
            <div className="w-6 h-[2px] bg-gray-600 mx-2" />
          )}
        </motion.div>
      ))}
    </div>
  )
}