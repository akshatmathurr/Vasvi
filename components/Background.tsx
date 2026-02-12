import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  // Fewer hearts, slower movement for minimalism
  const hearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 20 + Math.random() * 10,
    size: 15 + Math.random() * 20
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fff0f3]">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-rose-50/50" />
      
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300/20 blur-[1px]"
          initial={{ y: '110vh', x: `${heart.left}vw`, opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.5, 0],
            rotate: [0, 20, -20, 0] 
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{ fontSize: `${heart.size}px` }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default Background;