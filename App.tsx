import React, { useState } from 'react';
import { GameState } from './types';
import Background from './components/Background';
import Level1Quiz from './components/Level1Quiz';
import Level2Memory from './components/Level2Memory';
import Level3Unlock from './components/Level3Unlock';
import FinalGift from './components/FinalGift';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);

  const nextState = () => {
    switch (gameState) {
      case GameState.WELCOME:
        setGameState(GameState.LEVEL_1_QUIZ);
        break;
      case GameState.LEVEL_1_QUIZ:
        setGameState(GameState.LEVEL_2_MEMORY);
        break;
      case GameState.LEVEL_2_MEMORY:
        setGameState(GameState.LEVEL_3_CODE);
        break;
      case GameState.LEVEL_3_CODE:
        setGameState(GameState.FINAL_GIFT);
        break;
      case GameState.FINAL_GIFT:
        setGameState(GameState.ACCEPTED);
        break;
    }
  };

  const restartGame = () => {
    setGameState(GameState.WELCOME);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative font-sans text-stone-800">
      <Background />

      <main className="z-10 w-full flex flex-col items-center max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {gameState === GameState.WELCOME && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center flex flex-col items-center"
            >
              <h1 className="text-6xl md:text-8xl text-rose-500 font-handwriting mb-8 tracking-wide">
                Hey Vasvi
              </h1>
              <div className="w-16 h-1 bg-rose-200 rounded-full mb-8" />
              <p className="text-lg text-stone-600 mb-12 font-light max-w-md leading-relaxed">
                I have a little surprise waiting for you. <br/>
                But first, a small journey through our love.
              </p>
              <button
                onClick={nextState}
                className="group relative px-8 py-3 bg-white hover:bg-rose-50 text-rose-500 border border-rose-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:border-rose-300 flex items-center gap-3"
              >
                <span className="font-medium tracking-wide">Begin</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {gameState === GameState.LEVEL_1_QUIZ && (
            <motion.div
              key="level1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <Level1Quiz onComplete={nextState} />
            </motion.div>
          )}

          {gameState === GameState.LEVEL_2_MEMORY && (
            <motion.div
              key="level2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <Level2Memory onComplete={nextState} />
            </motion.div>
          )}

          {gameState === GameState.LEVEL_3_CODE && (
            <motion.div
              key="level3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <Level3Unlock onComplete={nextState} />
            </motion.div>
          )}

          {gameState === GameState.FINAL_GIFT && (
            <motion.div
              key="gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center"
            >
              <FinalGift onAccept={nextState} />
            </motion.div>
          )}

          {gameState === GameState.ACCEPTED && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-xl flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-handwriting text-rose-500 mb-6">
                She Said Yes!
              </h1>
              <p className="text-xl font-serif italic text-stone-600 mb-8">
                Happy Valentine's Day, Vasvi.
              </p>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl text-rose-400 mb-10"
              >
                ❤️
              </motion.div>

              <button
                onClick={restartGame}
                className="group flex items-center gap-2 text-stone-400 hover:text-rose-500 transition-colors text-xs font-bold tracking-widest uppercase"
              >
                <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                Restart Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-6 text-rose-300 text-xs font-medium tracking-widest uppercase">
        Forever & Always
      </footer>
    </div>
  );
}