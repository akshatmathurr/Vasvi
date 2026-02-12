import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Level1QuizProps {
  onComplete: () => void;
}

const Level1Quiz: React.FC<Level1QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showError, setShowError] = useState(false);

  const questions = [
    {
      text: "Who loves Vasvi the most?",
      options: ["Brad Pitt", "Her Husband", "The Mailman", "Her Cat"],
      correct: 1
    },
    {
      text: "What is the key to my heart?",
      options: ["Pizza", "Vasvi", "Gaming", "Money"],
      correct: 1
    },
    {
      text: "What are we?",
      options: ["Just friends", "Vasvi & Her Soulmate", "Neighbors", "Roommates"],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        onComplete();
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
    }
  };

  return (
    <div className="w-full max-w-md text-center">
      <span className="inline-block text-xs font-bold tracking-widest text-rose-400 uppercase mb-4">Chapter One</span>
      <h2 className="text-3xl font-serif text-stone-800 mb-8">Vasvi's Love Quiz</h2>

      <div className="relative">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className={`bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 mb-8 ${showError ? 'animate-shake ring-1 ring-red-200' : ''}`}
        >
          <h3 className="text-xl font-medium text-stone-700 mb-6">{questions[currentQuestion].text}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full py-4 px-6 rounded-xl bg-white border border-stone-100 hover:border-rose-200 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-all duration-200 text-left text-sm font-medium tracking-wide group"
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center gap-3">
        {questions.map((_, idx) => (
          <div 
            key={idx} 
            className={`transition-all duration-300 rounded-full ${
              idx === currentQuestion ? 'w-8 bg-rose-400' : 'w-2 bg-rose-200'
            } h-2`}
          />
        ))}
      </div>
    </div>
  );
};

export default Level1Quiz;