import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

interface Level3UnlockProps {
  onComplete: () => void;
}

const Level3Unlock: React.FC<Level3UnlockProps> = ({ onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const CORRECT_CODE = ['0', '2', '1', '4']; // Feb 14

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.slice(-1); 
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
    
    if (newCode.every((digit, i) => digit === CORRECT_CODE[i])) {
      setTimeout(onComplete, 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="w-full max-w-md text-center">
      <span className="inline-block text-xs font-bold tracking-widest text-rose-400 uppercase mb-4">Final Chapter</span>
      <h2 className="text-3xl font-serif text-stone-800 mb-8">Vasvi's Special Date</h2>

      <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-sm border border-white/60">
        <div className="flex justify-center mb-8">
           {code.join('') === '0214' ? 
            <Unlock className="w-6 h-6 text-rose-400" /> : 
            <Lock className="w-6 h-6 text-rose-300" />
           }
        </div>

        <p className="text-stone-500 mb-8 font-light">When do we celebrate love? (MMDD)</p>

        <div className="flex justify-center gap-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-16 text-center text-2xl font-serif text-rose-600 bg-white border border-rose-100 rounded-2xl focus:border-rose-400 focus:ring-0 outline-none transition-all shadow-sm"
              autoComplete="off"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level3Unlock;