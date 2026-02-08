'use client'
import { useEffect, useRef } from 'react'
import Scene3D from '@/components/Scene3D'
import FallingPetals from '@/components/FallingPetals'
import MessageBoard from '@/components/MessageBoard'

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
      <audio ref={audioRef} src="/audio/cancion-romantica.mp3" loop />
      
      <FallingPetals />
      
      <section className="h-screen w-full relative">
        <Scene3D />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce">
          Desliza para leer ↓
        </div>
      </section>

      <section className="py-20 px-4">
        <MessageBoard />
      </section>
    </div>
  )
}