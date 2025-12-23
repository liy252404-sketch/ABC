
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 設定目標時間為 2026-01-24 19:00 (台北時間)
  const targetDate = new Date('2026-01-24T19:00:00+08:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="fixed right-4 bottom-24 md:right-6 md:bottom-32 z-[110] animate-in slide-in-from-right-8 duration-1000">
      <div className="relative group">
        {/* Alarm Clock Top Bells */}
        <div className="flex justify-between px-3 md:px-4 -mb-1 md:-mb-2">
          <div className="w-6 h-3 md:w-8 md:h-4 bg-zinc-800 rounded-t-full border-t-2 border-x-2 border-zinc-700 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:bg-neon-green transition-colors duration-500"></div>
          <div className="w-6 h-3 md:w-8 md:h-4 bg-zinc-800 rounded-t-full border-t-2 border-x-2 border-zinc-700 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:bg-neon-green transition-colors duration-500"></div>
        </div>
        
        {/* Main Clock Body */}
        <div className="w-24 md:w-32 bg-zinc-900 border-2 border-zinc-800 rounded-lg md:rounded-xl p-2 md:p-3 shadow-2xl relative overflow-hidden group-hover:border-neon-green/50 transition-colors">
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          
          <div className="text-center mb-1 md:mb-2">
            <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">Event Starts In</span>
          </div>

          <div className="grid grid-cols-2 gap-1 md:gap-2 text-center">
            <div className="bg-black/50 rounded p-0.5 md:p-1">
              <div className="text-sm md:text-xl font-black text-neon-green font-mono leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[6px] md:text-[8px] text-zinc-500 font-mono uppercase">Days</div>
            </div>
            <div className="bg-black/50 rounded p-0.5 md:p-1">
              <div className="text-sm md:text-xl font-black text-neon-green font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[6px] md:text-[8px] text-zinc-500 font-mono uppercase">Hrs</div>
            </div>
            <div className="bg-black/50 rounded p-0.5 md:p-1">
              <div className="text-sm md:text-xl font-black text-neon-green font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[6px] md:text-[8px] text-zinc-500 font-mono uppercase">Min</div>
            </div>
            <div className="bg-black/50 rounded p-0.5 md:p-1 relative">
              <div className="text-sm md:text-xl font-black text-neon-green font-mono leading-none animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[6px] md:text-[8px] text-zinc-500 font-mono uppercase">Sec</div>
            </div>
          </div>

          {/* Bottom Feet */}
          <div className="flex justify-between px-2 mt-2 md:mt-3 -mb-4 md:-mb-5">
            <div className="w-1.5 h-2.5 md:w-2 md:h-3 bg-zinc-800 rounded-b-sm rotate-[15deg]"></div>
            <div className="w-1.5 h-2.5 md:w-2 md:h-3 bg-zinc-800 rounded-b-sm -rotate-[15deg]"></div>
          </div>
        </div>

        {/* Hover Label (Only visible on MD+) */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neon-green text-black font-black text-[10px] px-2 py-1 rounded-sm rotate-[-90deg] origin-right pointer-events-none whitespace-nowrap hidden md:block">
          WAKE UP YOUR PULSE
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
