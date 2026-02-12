import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Level2MemoryProps {
  onComplete: () => void;
}

const ITEMS = ["🌹", "✨", "🧸", "💝", "💍", "🕊️"];

const Level2Memory: React.FC<Level2MemoryProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<{ id: number; content: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  
  useEffect(() => {
    // Initialize game
    const duplicatedItems = [...ITEMS, ...ITEMS];
    const shuffled = duplicatedItems
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        content: item,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      if (cards[first].content === cards[second].content) {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);

        if (newCards.every(c => c.isMatched)) {
          setTimeout(onComplete, 1000);
        }
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 800);
      }
    }
  }, [flippedIndices, cards, onComplete]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);
  };

  return (
    <div className="w-full max-w-md text-center">
      <span className="inline-block text-xs font-bold tracking-widest text-rose-400 uppercase mb-4">Chapter Two</span>
      <h2 className="text-3xl font-serif text-stone-800 mb-8">Vasvi's Memory Lane</h2>

      <div className="grid grid-cols-4 gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/40">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="aspect-square cursor-pointer relative"
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-full h-full rounded-2xl transition-all duration-500 transform shadow-sm flex items-center justify-center text-2xl
              ${(card.isFlipped || card.isMatched) ? 'bg-white rotate-y-180 text-rose-500' : 'bg-rose-200/50 hover:bg-rose-200'}`}>
              {(card.isFlipped || card.isMatched) ? card.content : ''}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Level2Memory;