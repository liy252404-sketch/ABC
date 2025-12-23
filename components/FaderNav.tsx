
import React from 'react';

interface FaderNavProps {
  progress: number;
}

const FaderNav: React.FC<FaderNavProps> = ({ progress }) => {
  return (
    <nav className="fixed top-0 right-4 h-full w-12 flex flex-col items-center justify-center z-50 pointer-events-none md:right-8">
      <div className="h-64 w-1 bg-gray-800 rounded-full relative overflow-visible">
        {/* Fader track markings */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-4 h-px bg-gray-600 -left-1.5"
            style={{ top: `${i * 20}%` }}
          />
        ))}
        
        {/* The Fader Knob */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-8 h-12 bg-gray-300 rounded shadow-lg border-y-2 border-gray-400 flex flex-col justify-center items-center pointer-events-auto cursor-pointer group"
          style={{ top: `${progress}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-6 h-px bg-gray-600 mb-1"></div>
          <div className="w-6 h-px bg-gray-600 mb-1"></div>
          <div className="w-6 h-px bg-gray-600"></div>
          
          {/* Tooltip */}
          <div className="absolute left-[-60px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-neon-green text-[10px] px-1 py-0.5 rounded border border-neon-green font-mono">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-[10px] font-mono text-gray-500 uppercase rotate-90 whitespace-nowrap">
        Master Output
      </div>
    </nav>
  );
};

export default FaderNav;
