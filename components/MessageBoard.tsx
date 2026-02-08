'use client'
import { useState } from 'react'

export default function MessageBoard() {
  const [messages] = useState([
    "Desde que te conocí, las cosas se sienten diferentes...",
    "Me encanta cómo sonríes cuando no te das cuenta.",
    "Quería aprovechar este día para decirte algo especial."
  ])

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
      <h2 className="text-pink-400 text-xl mb-4 font-semibold italic text-center">
        Lo que nunca te dije...
      </h2>
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <p key={i} className="text-gray-300 text-lg leading-relaxed border-l-2 border-red-500 pl-4 italic">
            "{msg}"
          </p>
        ))}
      </div>
      
      {/* El paso final */}
      <div className="mt-8 text-center">
        <p className="text-white font-bold text-xl">¿Te gustaría ser mi San Valentín? ❤️</p>
      </div>
  
<div className="mt-12 text-center pb-10">
  <p className="text-white font-bold text-2xl mb-6">¿Qué dices?</p>
  <div className="flex justify-center gap-4">
    <button 
      onClick={() => alert("¡Dijo que SÍ! ❤️")} // Aquí puedes conectar a una DB o WhatsApp
      className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-full transition-all transform hover:scale-110"
    >
      Sí, acepto
    </button>
  </div>
</div>
    </div>
  )
  
}