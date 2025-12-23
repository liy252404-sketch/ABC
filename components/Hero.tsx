
import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

const Hero: React.FC<HeroProps> = ({ isUnlocked, onUnlock }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioAndEnter = () => {
    if (isUnlocked) return;
    
    // Web Audio Needle Drop Effect
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;
    
    // Simple scratch sound synth
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);

    setIsSpinning(true);
    setTimeout(() => {
      onUnlock();
    }, 1000);
  };

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 10);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out ${isUnlocked ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="absolute inset-0 bg-[#0F172A] opacity-95"></div>
      
      {/* Vinyl Record */}
      <div className="relative z-10 mb-8 group">
        <div 
          className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-zinc-900 border-8 border-zinc-800 shadow-[0_0_50px_rgba(173,255,47,0.2)] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={initAudioAndEnter}
        >
          {/* Record Grooves */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-zinc-700/30"
              style={{ width: `${100 - (i * 8)}%`, height: `${100 - (i * 8)}%` }}
            />
          ))}
          
          {/* Label */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neon-green flex flex-col items-center justify-center p-4 text-black text-center shadow-inner">
             <span className="font-bold text-[10px] uppercase tracking-tighter mb-1">City Pulse</span>
             <div className="w-1 h-1 bg-black rounded-full mb-1"></div>
             <span className="text-[8px] font-mono leading-none">SIDE A<br/>2026.01.24</span>
          </div>
        </div>

        {/* Needle Arm (Purely Visual) */}
        <div className="absolute -right-8 top-0 w-2 h-48 bg-zinc-600 origin-top rotate-[20deg] rounded-full hidden md:block">
          <div className="absolute bottom-0 w-8 h-4 bg-zinc-400 -left-3 rounded"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-black mb-4 glitch tracking-tighter">
          城市脈動：頻率交換所
        </h1>
        <p className="text-neon-green font-mono text-sm md:text-xl mb-8 tracking-widest uppercase">
          2026.01.24 - 01.26 ｜ 臺北流行音樂中心
        </p>
        
        <button 
          onClick={initAudioAndEnter}
          className="px-8 py-3 border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-[#0F172A] transition-all duration-300 font-bold uppercase tracking-widest text-lg"
        >
          Spin to Enter
        </button>
      </div>

      {/* Decorative Circuits (from visual reference) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,500 Q250,500 250,250 T500,250" fill="none" stroke="#ADFF2F" strokeWidth="2" />
          <path d="M1000,500 Q750,500 750,750 T500,750" fill="none" stroke="#BF40BF" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
