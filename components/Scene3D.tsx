'use client'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense } from 'react'
import Particles from './Particles'

export default function Scene3D() {
  return (
    <div className="h-full w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#080000']} /> {/* Un rojo casi negro */}
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          <Particles />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.1} intensity={1.2} mipmapBlur radius={0.5} />
          <Noise opacity={0.05} /> 
          {/* Le da textura de película */}
          <Vignette eskil={false} offset={0.1} darkness={1.1} /> 
          {/* Enfoque al centro */}
        </EffectComposer>
      </Canvas>
    </div>
  )
}