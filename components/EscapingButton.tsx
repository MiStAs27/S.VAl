"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function EscapingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    // Genera una posición aleatoria dentro de un rango
    const randomX = Math.random() * (window.innerWidth < 500 ? 200 : 400) - 100;
    const randomY = Math.random() * (window.innerWidth < 500 ? 200 : 400) - 100;
    setPosition({ x: randomX, y: randomY });
  };

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseEnter={moveButton}
      onClick={moveButton} // Por si intentan tocarlo en móvil
      className="px-6 py-2 bg-gray-700 text-white rounded-full border border-gray-500 text-sm md:text-base transition-colors hover:bg-gray-600"
    >
      Tal vez...
    </motion.button>
  );
}