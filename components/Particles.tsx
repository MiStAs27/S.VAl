'use client'
import { Text, Float, Stars } from '@react-three/drei'
import { useState, useEffect } from 'react'

const phrases = ["Hola...", "Quería decirte algo", "Eres increíble", "Te amo"]

export default function Particles() {
  const [index, setIndex] = useState(0)

  // Cambia la palabra automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Text
          fontSize={0.8}
          color="#ff4d6d"
          // Necesitas poner una fuente real en public/fonts/
          font="/fonts/Inter-Bold.ttf" 
          textAlign="center"
          maxWidth={5}
        >
          {phrases[index]}
          <meshStandardMaterial emissive="#ff0000" emissiveIntensity={2} />
        </Text>
      </Float>
    </group>
  )
}