'use client'
import { motion } from 'framer-motion'
import { Sparkles, Music, Pause, SkipForward } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { useState, useRef, useEffect } from 'react'

interface FloatingControlsProps {
  show3DScene: boolean
  onToggle3DScene: () => void
}

export default function FloatingControls({ show3DScene, onToggle3DScene }: FloatingControlsProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [songTitle, setSongTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const songs = [
    {src: "/audio/bajo-el-agua.mp3", title: "Bajo el Agua"},
    {src: "/audio/confieso.mp3", title: "Confieso"},
    {src: "/audio/bemaste.mp3", title: "Bemaste"},
    {src: "/audio/its-you.mp3", title: "It's You"},
    {src: "/audio/me_enamore.mp3", title: "Me Enamoré"},
  ]
  
  // Inicializar con la primera canción
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "metadata"
      setSongTitle(songs[0].title)
    }
  }, [])

  // Configurar evento de fin de canción
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSongEnd = () => {
      console.log("Canción terminada, índice actual:", currentSongIndex)
      // Calcular siguiente índice (vuelve a 0 después de la última)
      const nextIndex = (currentSongIndex + 1) % songs.length
      console.log("Siguiente canción (índice):", nextIndex)
      playNextSong()
    }

    audio.addEventListener('ended', handleSongEnd)

    return () => {
      audio.removeEventListener('ended', handleSongEnd)
    }
  }, [currentSongIndex])

  // Actualizar título cuando cambie la canción
  useEffect(() => {
    if (songs[currentSongIndex]) {
      setSongTitle(songs[currentSongIndex].title)
    }
  }, [currentSongIndex])

  const playNextSong = async () => {
    // Calcular siguiente índice (usa módulo para bucle)
    const nextIndex = (currentSongIndex + 1) % songs.length
    console.log("Cambiando a canción índice:", nextIndex, "Título:", songs[nextIndex].title)
    
    if (audioRef.current) {
      // Pausar y resetear
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      
      // Intentar cargar la nueva canción
      try {
        setIsLoading(true)
        // Forzar una nueva instancia de Audio para evitar problemas de caché
        audioRef.current = new Audio(songs[nextIndex].src)
        audioRef.current.preload = "auto"
        
        // Esperar a que el archivo esté listo
        await new Promise((resolve, reject) => {
          if (!audioRef.current) return reject()
          
          audioRef.current.addEventListener('canplaythrough', resolve, { once: true })
          audioRef.current.addEventListener('error', reject, { once: true })
          
          // Timeout para no esperar eternamente
          setTimeout(() => reject(new Error("Timeout loading audio")), 5000)
        })
        
        setCurrentSongIndex(nextIndex)
        
        // Si estaba reproduciendo, continuar con la nueva canción
        if (isPlaying) {
          console.log("Reproduciendo nueva canción...")
          await audioRef.current.play()
        }
        
      } catch (error) {
        console.error("Error al cambiar de canción:", error)
        alert(`🎵 Error: No se pudo cargar "${songs[nextIndex].title}".\nVerifica que el archivo exista en: ${songs[nextIndex].src}`)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const toggleMusic = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSongIndex].src)
      audioRef.current.preload = "auto"
    }

    const audio = audioRef.current

    if (isPlaying) {
      console.log("Pausando...")
      audio.pause()
      setIsPlaying(false)
    } else {
      console.log("Intentando reproducir:", songs[currentSongIndex].src)
      
      // Verificar si necesitamos cargar la canción actual
      if (!audio.src || audio.src !== window.location.origin + songs[currentSongIndex].src) {
        console.log("Cargando nueva fuente...")
        audio.src = songs[currentSongIndex].src
        audio.load() // Forzar carga
      }

      try {
        setIsLoading(true)
        await audio.play()
        console.log("¡Reproducción exitosa!")
        setIsPlaying(true)
      } catch (error: any) {
        console.error("Error de reproducción:", error)
        
        // Mensajes de error más específicos
        if (error.name === "NotAllowedError") {
          alert("🎵 El navegador bloqueó la reproducción automática. Por favor, da clic nuevamente.")
        } else if (error.name === "NotSupportedError") {
          alert(`🎵 Error: El formato de "${songs[currentSongIndex].title}" no es compatible.`)
        } else {
          alert(`🎵 Error al reproducir "${songs[currentSongIndex].title}".\n\nVerifica que el archivo exista en:\npublic/audio/${songs[currentSongIndex].src.split('/').pop()}`)
        }
        
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const skipToNext = async () => {
    // Siempre podemos pasar a la siguiente canción (bucle infinito)
    await playNextSong()
    
    // Si no estaba reproduciendo, iniciar reproducción automáticamente
    if (!isPlaying) {
      setIsPlaying(true)
    }
  }

  const getMusicButtonTitle = () => {
    if (isLoading) return 'Cargando...'
    if (!isPlaying) return `Reproducir: ${songTitle} (${currentSongIndex + 1}/${songs.length}) • Bucle activo`
    return `Reproduciendo: ${songTitle} (${currentSongIndex + 1}/${songs.length}) • Bucle activo`
  }

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} flex gap-2 md:gap-3 z-20`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle3DScene}
        className={`p-2.5 md:p-3 rounded-full border transition-all min-h-[40px] min-w-[40px] md:min-h-[44px] md:min-w-[44px] flex items-center justify-center ${
          show3DScene 
            ? "bg-purple-600 border-purple-400 text-white" 
            : "bg-white/10 border-white/20 text-pink-400"
        }`}
        title={show3DScene ? "Desactivar universo 3D" : "Activar universo 3D"}
      >
        <Sparkles size={isMobile ? 18 : 22} />
      </motion.button>
      
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          disabled={isLoading}
          className={`p-2.5 md:p-3 rounded-full border min-h-[40px] min-w-[40px] md:min-h-[44px] md:min-w-[44px] flex items-center justify-center group relative ${
            isLoading
              ? 'bg-gray-600/30 border-gray-500/50 text-gray-400'
              : isPlaying 
                ? 'bg-green-600/30 border-green-500/50 text-green-400'
                : 'bg-white/10 border-pink-400/30'
          }`}
          title={getMusicButtonTitle()}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : isPlaying ? (
            <Pause size={isMobile ? 18 : 22} />
          ) : (
            <Music size={isMobile ? 18 : 22} />
          )}
          
          {!isMobile && (
            <span className={`absolute -top-8 px-2 py-1 rounded whitespace-nowrap text-xs ${
              isLoading
                ? 'bg-gray-900/90 text-gray-200'
                : 'bg-black/80 text-white'
            }`}>
              {isLoading 
                ? '⏳ Cargando...' 
                : isPlaying 
                  ? `▶️ ${songTitle} (${currentSongIndex + 1}/${songs.length})`
                  : `⏸️ ${songTitle} (${currentSongIndex + 1}/${songs.length})`}
            </span>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={skipToNext}
          disabled={isLoading}
          className={`p-2.5 md:p-3 rounded-full border min-h-[40px] min-w-[40px] md:min-h-[44px] md:min-w-[44px] flex items-center justify-center ${
            isLoading
              ? 'opacity-40 cursor-not-allowed bg-white/5 border-white/10'
              : 'bg-white/5 border-pink-400/20'
          }`}
          title="Siguiente canción"
        >
          <SkipForward size={isMobile ? 16 : 20} />
        </motion.button>
      </div>
    </div>
  )
}