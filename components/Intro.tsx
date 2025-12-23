
import React, { useEffect, useRef } from 'react';

const Intro: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#ADFF2F';
      ctx.lineWidth = 1;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const amplitude = 50 + Math.sin(offset * 0.05) * 20;
        const freq = 0.01 + Math.sin(offset * 0.02) * 0.005;
        const y = centerY + Math.sin(x * freq + offset) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#BF40BF';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const amplitude = 30 + Math.cos(offset * 0.03) * 15;
        const freq = 0.008 + Math.cos(offset * 0.01) * 0.003;
        const y = centerY + Math.cos(x * freq + offset * 0.5) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += 0.05;
      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-32 md:py-64 overflow-hidden bg-black/50">
      <canvas 
        ref={canvasRef} 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-30 pointer-events-none"
      />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="transform transition-transform duration-500">
          {/* Activity Date Badge */}
          <div className="mb-6 inline-flex flex-col">
            <span className="bg-neon-green text-black px-3 py-1 text-sm font-black uppercase tracking-widest mb-1 italic">
              2026.01.24 — 01.26
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Event Duration / Taipei Pop Music Center</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tight leading-tight">
            每一座城市都有它獨特的 <span className="text-neon-green italic glitch">Bpm</span>...
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            <p>
              在擁擠的捷運車廂，我們聽見規律的共振；在深夜的巷弄出口，我們捕捉頻率的餘震。
              「城市脈動：頻率交換所」是一個將環境音與電子樂重新混編的實驗場域。
            </p>
            <p>
              我們不只是聽音樂，我們在交換頻率。
              透過聲音採集與即時生成的互動機制，你將成為這座城市交響樂的一部分。
            </p>
          </div>

          {/* Interactive Audio Hint */}
          <div className="mt-16 pt-8 border-t border-zinc-800/50">
            <div className="flex items-center space-x-4 animate-pulse">
              <div className="w-12 h-[2px] bg-neon-green"></div>
              <p className="text-neon-green font-mono text-xs md:text-sm uppercase tracking-widest flex items-center">
                <span className="mr-2">◢</span> 
                點擊下方展區面板以開啟專屬頻率音場 / Click panels below to tune in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
