'use client'
import { useEffect, useRef } from 'react'
import Scene3D from '@/components/ParticleEffects'
import FallingPetals from '@/components/FloatingControls'
import StepMessages from '@/components/StepMessages'
import MessageBoard from '@/components/MessageBoar'

export default function Experience() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.play().catch(e => console.log("Audio play blocked", e))
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <audio ref={audioRef} src="@/audio/confieso.mp3" loop />
      
      <FallingPetals show3DScene={false} onToggle3DScene={function (): void {
        throw new Error('Function not implemented.')
      } } />
      
      <section className="h-screen w-full relative">
        <Scene3D />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce">
          Desliza para leer ↓
        </div>
      </section>
      <StepMessages
        texts={[
          { title: "Bienvenido", content: "Este es un mensaje de prueba." }
        ]}
        currentTextIndex={0}
        onTextChange={() => {}}
        onNext={() => {}}
      />
      <MessageBoard/>
    </div>
  )
}