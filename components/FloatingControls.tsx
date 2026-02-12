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
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Rutas de audio - versión corregida para Vercel
  const songs = [
    { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/bemaste2.mp3`, title: "Bemaste" },
    //{ src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/confieso2.mp3`, title: "Confieso" },
    { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/bajo-el-agua2.mp3`, title: "Bajo el Agua" },
    { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/Te-Quiero-Aqu-Ya2.mp3`, title: "Te Quiero Aquí Ya" },
    { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/me_enamore2.mp3`, title: "Me Enamoré" },
    { src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/audio/Cafune2.mp3`, title: "Cafune" },
  ]
  
  // Inicializar audio y verificar archivos
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        console.log("🎵 Inicializando reproductor de audio...")
        
        // Crear nueva instancia de audio
        const audio = new Audio(songs[0].src)
        audio.preload = "auto"
        audio.volume = 0.5 // Volumen inicial al 50%
        
        // Configurar eventos de audio
        audio.addEventListener('error', (e) => {
          console.error(`❌ Error de audio:`, e)
          console.error(`Src actual: ${audio.src}`)
          
          // Intentar con ruta absoluta como fallback
          const absolutePath = `${window.location.origin}${songs[0].src.replace(process.env.NEXT_PUBLIC_BASE_PATH || '', '')}`
          console.log(`🔄 Intentando con ruta absoluta: ${absolutePath}`)
          audio.src = absolutePath
        })
        
        audio.addEventListener('loadeddata', () => {
          console.log(`✅ Audio cargado: ${songs[0].title}`)
        })
        
        audio.addEventListener('canplaythrough', () => {
          console.log(`✅ Audio listo para reproducir: ${songs[0].title}`)
        })
        
        audioRef.current = audio
        setSongTitle(songs[0].title)
        
        // Verificar que el archivo existe
        const response = await fetch(songs[0].src)
        if (!response.ok) {
          console.warn(`⚠️ No se pudo cargar inicialmente: ${songs[0].title} (${response.status})`)
          
          // Intentar con ruta absoluta
          const absolutePath = `${window.location.origin}${songs[0].src.replace(process.env.NEXT_PUBLIC_BASE_PATH || '', '')}`
          audio.src = absolutePath
        }
        
      } catch (error) {
        console.error("Error inicializando audio:", error)
      }
    }
    
    initializeAudio()
    
    // Depuración: verificar todas las rutas
    songs.forEach((song, index) => {
      fetch(song.src)
        .then(res => {
          if (!res.ok) {
            console.warn(`❌ Canción ${index + 1} (${song.title}): No encontrada en ${song.src}`)
          } else {
            console.log(`✅ Canción ${index + 1} (${song.title}): OK`)
          }
        })
        .catch(() => {
          console.warn(`❌ Canción ${index + 1} (${song.title}): Error de red`)
        })
    })
    
    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  // Intentar autoplay cuando la página se carga
  useEffect(() => {
    const attemptAutoPlay = async () => {
      // Esperar un momento para que todo se cargue
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (audioRef.current && !autoPlayAttempted) {
        try {
          console.log("🎵 Intentando reproducción automática...")
          
          // Verificar si el audio está listo
          if (audioRef.current.readyState < 2) {
            await new Promise((resolve, reject) => {
              audioRef.current?.addEventListener('canplaythrough', resolve, { once: true })
              audioRef.current?.addEventListener('error', reject, { once: true })
              setTimeout(() => reject(new Error("Timeout")), 3000)
            })
          }
          
          // Intentar reproducir
          await audioRef.current.play()
          console.log("✅ Reproducción automática exitosa")
          setIsPlaying(true)
          
        } catch (error: any) {
          console.log("⚠️ Autoplay bloqueado o fallido:", error.message)
          
          // Si es un error de política de autoplay, esperar interacción del usuario
          if (error.name === "NotAllowedError") {
            console.log("👆 El navegador requiere interacción del usuario")
            
            // Mostrar un mensaje sutil (opcional)
            // Podemos mostrar un tooltip o indicador visual
          }
        } finally {
          setAutoPlayAttempted(true)
        }
      }
    }
    
    // Intentar autoplay después de que todo esté listo
    const timer = setTimeout(() => {
      attemptAutoPlay()
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [autoPlayAttempted])

  // Configurar evento de fin de canción
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSongEnd = () => {
      const nextIndex = (currentSongIndex + 1) % songs.length
      console.log(`🎵 Canción terminada. Siguiente: ${songs[nextIndex].title}`)
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

  // Añadir event listeners para detectar interacción del usuario
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        console.log("👆 Usuario interactuó con la página")
        setHasUserInteracted(true)
        
        // Si el autoplay falló anteriormente, intentar de nuevo
        if (!isPlaying && audioRef.current && autoPlayAttempted) {
          console.log("🔄 Reintentando reproducción después de interacción del usuario")
          setTimeout(() => {
            toggleMusic()
          }, 300)
        }
      }
    }
    
    // Eventos comunes de interacción
    const events = ['click', 'touchstart', 'keydown', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { once: true })
    })
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [hasUserInteracted, isPlaying, autoPlayAttempted])

  const playNextSong = async () => {
    const nextIndex = (currentSongIndex + 1) % songs.length
    
    if (audioRef.current) {
      try {
        setIsLoading(true)
        
        // Pausar y limpiar audio actual
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        
        // Verificar que el archivo existe antes de intentar cargarlo
        console.log(`🔍 Verificando: ${songs[nextIndex].src}`)
        const response = await fetch(songs[nextIndex].src)
        
        if (!response.ok) {
          throw new Error(`Archivo no encontrado (${response.status} ${response.statusText})`)
        }
        
        // Crear nueva instancia de Audio con la siguiente canción
        const newAudio = new Audio(songs[nextIndex].src)
        newAudio.preload = "auto"
        newAudio.volume = audioRef.current.volume // Mantener el mismo volumen
        
        // Configurar eventos de error
        newAudio.addEventListener('error', (e) => {
          console.error(`❌ Error cargando ${songs[nextIndex].title}:`, e)
          console.error(`Ruta fallida: ${songs[nextIndex].src}`)
          
          // Intentar con ruta absoluta
          const absolutePath = `${window.location.origin}${songs[nextIndex].src.replace(process.env.NEXT_PUBLIC_BASE_PATH || '', '')}`
          console.log(`🔄 Intentando con ruta absoluta: ${absolutePath}`)
          newAudio.src = absolutePath
          newAudio.load()
        })
        
        // Esperar a que el archivo esté listo
        await new Promise((resolve, reject) => {
          if (!newAudio) {
            reject(new Error("Elemento de audio no disponible"))
            return
          }
          
          const handleCanPlay = () => {
            newAudio.removeEventListener('canplaythrough', handleCanPlay)
            newAudio.removeEventListener('error', handleError)
            resolve(true)
          }
          
          const handleError = (e: any) => {
            newAudio.removeEventListener('canplaythrough', handleCanPlay)
            newAudio.removeEventListener('error', handleError)
            reject(new Error(`Error cargando audio: ${e.message}`))
          }
          
          newAudio.addEventListener('canplaythrough', handleCanPlay, { once: true })
          newAudio.addEventListener('error', handleError, { once: true })
          
          // Timeout después de 5 segundos
          setTimeout(() => {
            newAudio.removeEventListener('canplaythrough', handleCanPlay)
            newAudio.removeEventListener('error', handleError)
            reject(new Error("Timeout al cargar el audio"))
          }, 5000)
        })
        
        // Actualizar referencia y estado
        audioRef.current = newAudio
        setCurrentSongIndex(nextIndex)
        
        // Si estaba reproduciendo, continuar con la nueva canción
        if (isPlaying) {
          await newAudio.play()
        }
        
      } catch (error: any) {
        console.error("Error al cambiar de canción:", error)
        
        // Mostrar mensaje de error específico
        let errorMessage = `No se pudo cargar "${songs[nextIndex].title}".`
        
        if (error.message.includes("404") || error.message.includes("no encontrado")) {
          errorMessage += `\n\n🔍 Verifica que el archivo exista en: public/audio/${songs[nextIndex].src.split('/').pop()}`
          errorMessage += `\n📁 Ruta intentada: ${songs[nextIndex].src}`
        } else if (error.message.includes("Timeout")) {
          errorMessage += "\n⏰ El archivo tardó demasiado en cargarse."
        }
        
        alert(`🎵 Error: ${errorMessage}`)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const toggleMusic = async () => {
    // Marcar que el usuario ha interactuado
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
    }
    
    if (!audioRef.current) {
      // Intentar crear audio con diferentes estrategias si falla
      const audioPaths = [
        songs[currentSongIndex].src,
        `${window.location.origin}${songs[currentSongIndex].src.replace(process.env.NEXT_PUBLIC_BASE_PATH || '', '')}`,
        `/audio/${songs[currentSongIndex].src.split('/').pop()}`
      ]
      
      for (const path of audioPaths) {
        try {
          const testAudio = new Audio(path)
          testAudio.preload = "auto"
          testAudio.volume = 0.5
          
          // Verificar rápidamente si el archivo existe
          const response = await fetch(path)
          if (response.ok) {
            audioRef.current = testAudio
            console.log(`✅ Audio creado con ruta: ${path}`)
            break
          }
        } catch (e) {
          continue
        }
      }
      
      if (!audioRef.current) {
        alert(`🎵 Error: No se pudo inicializar el reproductor.\n\nVerifica que los archivos MP3 estén en la carpeta "public/audio/"`)
        return
      }
    }

    const audio = audioRef.current

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        setIsLoading(true)
        
        // Verificar que el audio esté cargado
        if (audio.readyState < 2) { // 0 = HAVE_NOTHING, 1 = HAVE_METADATA
          // Cargar el audio si no está listo
          audio.load()
          
          // Esperar a que se cargue
          await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true })
            audio.addEventListener('error', reject, { once: true })
            setTimeout(() => reject(new Error("Timeout")), 3000)
          })
        }
        
        await audio.play()
        setIsPlaying(true)
        console.log(`▶️ Reproduciendo: ${songTitle}`)
        
      } catch (error: any) {
        console.error("Error de reproducción:", error)
        
        let errorMessage = `No se pudo reproducir "${songTitle}".`
        
        if (error.name === "NotAllowedError") {
          errorMessage = "🎵 El navegador bloqueó la reproducción automática. Por favor, da clic nuevamente."
        } else if (error.message.includes("Timeout")) {
          errorMessage = `🎵 El archivo "${songTitle}" tardó demasiado en cargarse.\n\nVerifica la conexión o el tamaño del archivo.`
        } else {
          errorMessage += `\n\n🔍 Verifica que el archivo MP3 exista en:\npublic/audio/${songs[currentSongIndex].src.split('/').pop()}`
        }
        
        alert(errorMessage)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const skipToNext = async () => {
    // Marcar que el usuario ha interactuado
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
    }
    
    if (isLoading) return
    
    await playNextSong()
    
    // Si no estaba reproduciendo, iniciar reproducción automáticamente
    if (!isPlaying) {
      setIsPlaying(true)
      try {
        if (audioRef.current) {
          await audioRef.current.play()
        }
      } catch (error) {
        console.error("Error al iniciar reproducción automática:", error)
      }
    }
  }

  // Control de volumen (opcional)
  const adjustVolume = (level: number) => {
    if (audioRef.current) {
      audioRef.current.volume = level
    }
  }

  const getMusicButtonTitle = () => {
    if (!hasUserInteracted && !isPlaying) {
      return "🎵 La música comenzará automáticamente... (da clic si no inicia)"
    }
    if (isLoading) return 'Cargando...'
    if (!isPlaying) return `Reproducir: ${songTitle} (${currentSongIndex + 1}/${songs.length}) • Bucle activo`
    return `Reproduciendo: ${songTitle} (${currentSongIndex + 1}/${songs.length}) • Bucle activo`
  }

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} flex gap-2 md:gap-3 z-20`}>
      {/* Indicador de autoplay (solo visible al inicio) */}
      {!hasUserInteracted && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
        >
          🎵 La música comenzará en breve...
        </motion.div>
      )}
      
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
                : hasUserInteracted 
                  ? 'bg-white/10 border-pink-400/30'
                  : 'bg-blue-600/30 border-blue-500/50 text-blue-400 animate-pulse'
          }`}
          title={getMusicButtonTitle()}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : isPlaying ? (
            <Pause size={isMobile ? 18 : 22} />
          ) : (
            <div className="relative">
              <Music size={isMobile ? 18 : 22} />
              {!hasUserInteracted && (
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                />
              )}
            </div>
          )}
          
          {!isMobile && (
            <span className={`absolute -top-8 px-2 py-1 rounded whitespace-nowrap text-xs ${
              isLoading
                ? 'bg-gray-900/90 text-gray-200'
                : isPlaying
                  ? 'bg-black/80 text-white'
                  : !hasUserInteracted
                    ? 'bg-blue-900/90 text-blue-200'
                    : 'bg-black/80 text-white'
            }`}>
              {!hasUserInteracted && !isPlaying 
                ? '🎵 Iniciando...' 
                : isLoading 
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