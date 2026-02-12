import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateRomanticPoem } from '../services/gemini';

interface FinalGiftProps {
  onAccept: () => void;
}

const FinalGift: React.FC<FinalGiftProps> = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [poem, setPoem] = useState("Writing the perfect words for Vasvi...");

  useEffect(() => {
    generateRomanticPoem().then(setPoem);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fda4af', '#ffe4e6'],
      ticks: 200
    });
  };

  const handleYes = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#f43f5e', '#fda4af', '#ffe4e6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    onAccept();
  };

  if (!isOpen) {
    return (
      <div className="text-center cursor-pointer group" onClick={handleOpen}>
        <motion.div
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white p-10 rounded-[2rem] shadow-xl border border-rose-100 group-hover:shadow-rose-100/50 transition-all duration-500"
        >
          <Gift className="w-24 h-24 text-rose-300 stroke-[1px]" />
        </motion.div>
        <p className="mt-8 text-xl text-rose-400 font-handwriting tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
          For Vasvi
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-lg bg-white p-10 md:p-14 rounded-[2rem] shadow-xl border border-rose-50 text-center relative mx-4"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-handwriting text-rose-500 mb-2">My Dearest Vasvi</h2>
        <div className="w-12 h-0.5 bg-rose-200 mx-auto rounded-full" />
      </div>
      
      <div className="mb-10 relative">
        <span className="absolute -top-4 -left-2 text-6xl text-rose-100 font-serif opacity-50">"</span>
        <p className="text-lg md:text-xl text-stone-600 font-serif italic leading-loose">
          {poem}
        </p>
        <span className="absolute -bottom-8 -right-2 text-6xl text-rose-100 font-serif opacity-50">"</span>
      </div>

      <div className="mt-12 space-y-8">
        <h3 className="text-2xl font-serif text-stone-800">Will you be my Valentine?</h3>
        
        <button
          onClick={handleYes}
          className="bg-rose-500 hover:bg-rose-600 text-white text-lg tracking-widest uppercase font-medium py-4 px-12 rounded-full shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
        >
          Yes, I will ❤️
        </button>
      </div>
    </motion.div>
  );
};

export default FinalGift;