"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Send, Sparkles, Star } from "lucide-react";
import confetti from "canvas-confetti";
import EscapingButton from "@/components/EscapingButton";
import FallingPetals from "@/components/FallingPetals";
import Scene3D from "@/components/Scene3D";
import MessageBoard from "@/components/MessageBoard";

export default function ValentinePage() {
  const [showResponse, setShowResponse] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [show3DScene, setShow3DScene] = useState(false);

  const texts = [
    {
      title: "Para Ti Mi Amor",
      content: "En este momento especial, todo gira alrededor de ti. Eres el latido de mi corazón en este San Valentín"
    },
    {
      title: "Mi Amor",
      content: "Desde que llegaste a mi vida, cada día tiene más color, más sentido y más amor. Eres esa luz que ilumina mis días y la calma que acuna mis noches. En este San Valentín, quiero recordarte que no hay giro en este universo 3D, ni fotografía en esta galería, que pueda capturar la belleza que irradias. Eres mi sueño hecho realidad, mi anhelo convertido en presencia."
    }
  ];

  // Cambiar texto automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleYes = () => {
    setShowResponse(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ff69b4", "#ffd700", "#ffffff"],
      shapes: ["circle", "square"],
    });
    
    // Disparar confeti adicional
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#ff0000", "#ff69b4", "#ffffff"],
      });
    }, 250);
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#ff0000", "#ff69b4", "#ffffff"],
      });
    }, 500);
  };

  const addMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue("");
      
      // Pequeño confeti al enviar mensaje
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#ff69b4"],
      });
    }
  };

  const toggle3DScene = () => {
    setShow3DScene(!show3DScene);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white flex flex-col items-center justify-center p-4 overflow-hidden font-serif relative">
      
      {/* Fondo 3D Opcional */}
      <AnimatePresence>
        {show3DScene && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
          >
            <Scene3D />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fondo de partículas/estrellas */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-red-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.1),transparent_70%)]" />
      </div>

      {/* Pétalos cayendo */}
      <FallingPetals />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Encabezado con título animado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-yellow-300 animate-pulse" size={24} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Para Ti, Mi Amor
            </h1>
            <Sparkles className="text-yellow-300 animate-pulse" size={24} />
          </div>
          <p className="text-lg text-gray-300">Un San Valentín especial</p>
        </motion.div>

        {/* Contenedor de mensajes con animación */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-black/70 via-purple-900/30 to-black/70 backdrop-blur-xl border-2 border-pink-500/30 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl shadow-pink-900/30"
          >
            {/* Decoración de esquina */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-pink-400 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-pink-400 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-pink-400 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-pink-400 rounded-br-lg" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-6">
                {texts[currentTextIndex].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                {texts[currentTextIndex].content}
              </p>

              {/* Indicador de texto */}
              <div className="flex justify-center gap-2 mb-6">
                {texts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTextIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTextIndex 
                        ? "bg-pink-500 scale-125" 
                        : "bg-pink-900 hover:bg-pink-700"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Pregunta y botones */}
            <div className="mt-12 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-10"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  ¿Me das el honor de ser tu San Valentín? 💖
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="px-10 py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 transition-all flex items-center gap-3 text-lg"
                  >
                    <Heart size={24} fill="white" />
                    ¡SÍ, POR SIEMPRE!
                    <Star size={24} className="text-yellow-300" />
                  </motion.button>
                  
                  <EscapingButton />
                </div>
              </motion.div>

              {showResponse && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl border border-emerald-500/30"
                >
                  <p className="text-2xl text-emerald-300 font-bold">
                    ¡Me haces la persona más feliz del universo! 🥰✨
                  </p>
                  <p className="text-gray-300 mt-2">
                    Prometo hacer de cada día una aventura contigo 💫
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Sección de mensajes personalizados */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <MessageBoard />
        </motion.section>

        {/* Chat de mensajes en tiempo real */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-6 mb-12"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-300">
            <Heart size={20} className="text-pink-500 animate-pulse" /> 
            Tu libro de recuerdos 💌
          </h2>
          <form onSubmit={addMessage} className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe un mensaje para la eternidad..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors placeholder-gray-400"
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all"
            >
              <Send size={20} />
            </motion.button>
          </form>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Heart size={48} className="mx-auto mb-4 opacity-20" />
                <p>Se el primero en dejar un mensaje de amor eterno...</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 p-4 rounded-lg border-l-4 border-pink-500 text-sm backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-500/20 p-2 rounded-full">
                      <Heart size={12} className="text-pink-300" />
                    </div>
                    <p className="text-gray-200">{msg}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      </div>

      {/* Controles flotantes */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle3DScene}
          className={`p-3 rounded-full border transition-all ${
            show3DScene 
              ? "bg-purple-600 border-purple-400 text-white" 
              : "bg-white/10 border-white/20 text-pink-400 hover:bg-white/20"
          }`}
          title={show3DScene ? "Desactivar universo 3D" : "Activar universo 3D"}
        >
          <Sparkles size={24} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Reproducir música (implementar lógica real)
            alert("🎵 Próximamente: Tu canción especial");
          }}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all text-pink-400 border border-pink-400/30"
          title="Tu canción especial"
        >
          <Music size={24} />
        </motion.button>
      </div>

      {/* Efecto de partículas adicionales */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              y: [null, "-100vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Pie de página */}
      <footer className="mt-12 text-center text-gray-500 text-sm pb-8">
        <p>Creado con ❤️ para la persona más especial de mi vida</p>
        <p className="mt-2">Cada momento contigo es una eternidad feliz</p>
      </footer>
    </main>
  );
}