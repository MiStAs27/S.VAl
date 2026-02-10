"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/StepIndicator";
import StepIntro from "@/components/StepIntro";
import StepMessages from "@/components/StepMessages";
import StepQuestion from "@/components/StepQuestion";
import FloatingControls from "@/components/FloatingControls";
import ParticleEffects from "@/components/ParticleEffects";
import NavigationFooter from "@/components/NavigationFooter";
import FallingPetals from "@/components/FallingPetals";
import Scene3D from "@/components/Scene3D";
import confetti from "canvas-confetti";
import { useMediaQuery } from "react-responsive";

export default function ValentinePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [show3DScene, setShow3DScene] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const steps = [
    { title: "Paso 1", icon: "🙂" },
    { title: "Paso 2", icon: "😊" },
    { title: "Paso 3", icon: "😧" }
  ];

  const texts = [
    {
      title: "Para Ti",
      content: "Te agradesco por cada sonrisa, cada abrazo, cada momento compartido. Tú me diste lo que muchos buscan toda su vida."
    },
    {
      title: "Sonrisa",
      content: "No sé si lo recuerdas, pero te lo había dicho antes… no olvides sonreír, porque cuando tú sonríes y eres feliz, yo también lo soy."
    },
    {
      title: "Mi Amuleto de la Suerte",
      content: "Te conté la historia de mi amuleto de la suerte, pero no la razón por la cual te lo di… En Año Nuevo te hice tres promesas, y te lo entregué porque sé que no siempre podré estar contigo, pero al menos un pedazo de mí sí podrá acompañarte."
    }
  ];

  useEffect(() => {
    if (currentStep === 1) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentStep, texts.length]);

  const handleYes = () => {
    setShowResponse(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ff69b4", "#ffd700", "#ffffff"],
      shapes: ["circle"],
    });
    
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
      
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#ff69b4"],
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      nextStep();
    }, 800);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <StepIntro isUnlocked={isUnlocked} onUnlock={handleUnlock} />;
      case 1:
        return (
          <StepMessages
            texts={texts}
            currentTextIndex={currentTextIndex}
            onTextChange={setCurrentTextIndex}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepQuestion
            showResponse={showResponse}
            onYes={handleYes}
            messages={messages}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onAddMessage={addMessage}
          />
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black text-white flex flex-col items-center justify-center p-4 overflow-hidden font-serif relative">
      
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

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-red-900/10" />
        <FallingPetals />
        <ParticleEffects />
      </div>

      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          onStepClick={setCurrentStep} 
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-black/60 to-purple-900/20 backdrop-blur-xl border-2 border-pink-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-900/20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                {steps[currentStep].title}
              </h1>
              <p className="text-gray-400 mt-2">
                {currentStep === 0 && "Algo especial"}
                {currentStep === 1 && "Sincero"}
                {currentStep === 2 && "Miedo 🥶"}
              </p>
            </motion.div>

            {renderStepContent()}

            <NavigationFooter 
              currentStep={currentStep}
              onPrev={prevStep}
              onNext={nextStep}
              onHome={() => setCurrentStep(0)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <FloatingControls 
        show3DScene={show3DScene} 
        onToggle3DScene={() => setShow3DScene(!show3DScene)} 
      />

      <footer className="mt-8 text-center text-gray-500 text-sm pb-4">
        <p>Paso {currentStep + 1} de {steps.length} • Creado por HM para ade</p>
      </footer>
    </main>
  );
}