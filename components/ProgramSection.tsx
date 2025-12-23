
import React, { useState, useRef, useEffect } from 'react';
import { QUOTES, SYNTH_IMAGES, VINYL_IMAGES } from '../constants';

type ProgramSectionId = 'A' | 'B' | 'C' | 'D' | null;

const ProgramSection: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [synthIndex, setSynthIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<ProgramSectionId>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentNodesRef = useRef<{ oscs: OscillatorNode[], gains: GainNode[] } | null>(null);

  // 清除當前播放的所有聲音
  const stopAllSounds = () => {
    if (currentNodesRef.current) {
      currentNodesRef.current.oscs.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      currentNodesRef.current.gains.forEach(gain => {
        gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current!.currentTime + 0.5);
      });
      currentNodesRef.current = null;
    }
  };

  // 合成特定區域的背景音樂
  const playSectionMusic = (id: ProgramSectionId) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    stopAllSounds();
    if (!id) return;

    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    const createOsc = (freq: number, type: OscillatorType, volume: number, rampTime = 2) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + rampTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscs.push(osc);
      gains.push(gain);
    };

    if (id === 'A') { // Lo-fi / Vinyl: Deep base pulse + Crackle
      createOsc(55, 'sine', 0.1); // Bass A1
      createOsc(110, 'triangle', 0.05); // Sub
      const interval = setInterval(() => {
        if (activeSection !== 'A') { clearInterval(interval); return; }
        const snap = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snap.type = 'square';
        snap.frequency.setValueAtTime(Math.random() * 1000, ctx.currentTime);
        snapGain.gain.setValueAtTime(0.01, ctx.currentTime);
        snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        snap.connect(snapGain);
        snapGain.connect(ctx.destination);
        snap.start();
        snap.stop(ctx.currentTime + 0.05);
      }, 400);
    } else if (id === 'B') { // Field Recording: Windy noise + Pings
      createOsc(150, 'sine', 0.05);
      const interval = setInterval(() => {
        if (activeSection !== 'B') { clearInterval(interval); return; }
        const ping = ctx.createOscillator();
        const pingGain = ctx.createGain();
        ping.type = 'sine';
        ping.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
        pingGain.gain.setValueAtTime(0.03, ctx.currentTime);
        pingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        ping.connect(pingGain);
        pingGain.connect(ctx.destination);
        ping.start();
        ping.stop(ctx.currentTime + 1.5);
      }, 2000);
    } else if (id === 'C') { // Ethereal Swap: Shimmering pads
      createOsc(220, 'sine', 0.08);
      createOsc(329.63, 'sine', 0.04); // E4
      createOsc(440, 'sine', 0.02); // A4
    } else if (id === 'D') { // Synth Workshop: Rhythm Beat (Kick + Hi-hat)
      let step = 0;
      const interval = setInterval(() => {
        if (activeSection !== 'D') { clearInterval(interval); return; }
        
        // Kick Drum (正拍 1, 3)
        if (step % 2 === 0) {
          const kOsc = ctx.createOscillator();
          const kGain = ctx.createGain();
          kOsc.type = 'sine';
          kOsc.frequency.setValueAtTime(150, ctx.currentTime);
          kOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
          kGain.gain.setValueAtTime(0.4, ctx.currentTime);
          kGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          kOsc.connect(kGain);
          kGain.connect(ctx.destination);
          kOsc.start();
          kOsc.stop(ctx.currentTime + 0.3);
        }

        // Hi-hat (每一拍)
        const hOsc = ctx.createOscillator();
        const hGain = ctx.createGain();
        hOsc.type = 'square';
        hOsc.frequency.setValueAtTime(10000, ctx.currentTime);
        hGain.gain.setValueAtTime(0.03, ctx.currentTime);
        hGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        hOsc.connect(hGain);
        hGain.connect(ctx.destination);
        hOsc.start();
        hOsc.stop(ctx.currentTime + 0.05);

        step = (step + 1) % 4;
      }, 500); // 120 BPM
    }

    currentNodesRef.current = { oscs, gains };
  };

  const handleSectionClick = (id: ProgramSectionId) => {
    const nextId = activeSection === id ? null : id;
    setActiveSection(nextId);
    playSectionMusic(nextId);
  };

  const playEffect = (type: 'scratch' | 'beep' | 'noise') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    if (type === 'scratch') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
    } else if (type === 'beep') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
    } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const generateQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTyping(true);
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setCurrentQuote('');
    let i = 0;
    const interval = setInterval(() => {
      setCurrentQuote(prev => prev + quote[i]);
      i++;
      if (i >= quote.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);
    playEffect('beep');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSynthIndex(prev => (prev + 1) % SYNTH_IMAGES.length);
    }, 3000);
    return () => {
      clearInterval(timer);
      stopAllSounds();
    };
  }, []);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-4 glitch tracking-tighter uppercase italic">Program</h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          {activeSection ? `NOW STREAMING: FREQUENCY_ZONE_${activeSection}` : 'Click any section to tune in'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* A. Vinyl & CD Market */}
        <div 
          onClick={() => handleSectionClick('A')}
          className={`group relative bg-zinc-900 border transition-all duration-500 overflow-hidden cursor-pointer p-8 ${activeSection === 'A' ? 'border-neon-green ring-1 ring-neon-green shadow-[0_0_30px_rgba(173,255,47,0.1)]' : 'border-zinc-800 hover:border-zinc-600'}`}
          onMouseEnter={() => !activeSection && playEffect('scratch')}
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm transition-colors ${activeSection === 'A' ? 'bg-black text-neon-green animate-pulse' : 'bg-neon-green text-black'}`}>A</span>
              靈魂唱片行
            </h3>
            <p className="text-zinc-500 mb-6">Vinyl & CD Market - 展示獨立唱片行特色，挖掘隱藏在城市縫隙中的絕版聲響。</p>
            <div className="grid grid-cols-3 gap-4">
              {VINYL_IMAGES.map((src, i) => (
                <div key={i} className={`relative aspect-square overflow-hidden bg-zinc-800 transition-all duration-700 ${activeSection === 'A' ? 'rotate-[360deg] scale-95 opacity-100' : 'group-hover:scale-105'}`}>
                   <img src={src} alt={`Vinyl ${i}`} className="w-full h-full object-cover" />
                   <div className={`absolute inset-0 bg-black/20 ${activeSection === 'A' ? 'opacity-0' : ''}`}></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black/50 border border-white/20"></div>
                </div>
              ))}
            </div>
          </div>
          {activeSection === 'A' && (
            <div className="absolute top-4 right-4 text-[10px] font-mono text-neon-green animate-bounce">LIVE FREQUENCY</div>
          )}
        </div>

        {/* B. Field Recording Lab */}
        <div 
          onClick={() => handleSectionClick('B')}
          className={`group relative bg-zinc-900 border transition-all duration-500 overflow-hidden cursor-pointer p-8 ${activeSection === 'B' ? 'border-neon-purple ring-1 ring-neon-purple shadow-[0_0_30px_rgba(191,64,191,0.1)]' : 'border-zinc-800 hover:border-zinc-600'}`}
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm transition-colors ${activeSection === 'B' ? 'bg-black text-neon-purple animate-pulse' : 'bg-neon-purple text-black'}`}>B</span>
              聲音採集實驗室
            </h3>
            <p className="text-zinc-500 mb-6">Field Recording Lab - 點擊開啟環境音場，體驗從捷運到咖啡廳的頻率變化。</p>
          </div>
          <div 
            className="h-32 bg-black border border-zinc-800 relative overflow-hidden group"
            onMouseMove={(e) => {
              if (activeSection !== 'B') return;
              if (Math.random() > 0.95) playEffect('noise');
            }}
          >
            <div className={`absolute inset-0 opacity-40 pointer-events-none flex items-center justify-around px-4 transition-all duration-1000 ${activeSection === 'B' ? 'gap-1' : 'gap-4'}`}>
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 bg-neon-purple transition-all duration-300 ${activeSection === 'B' ? 'animate-pulse' : ''}`} 
                  style={{ height: `${Math.random() * 80 + 10}%`, animationDelay: `${i * 0.05}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* C. Blind Music Swap */}
        <div 
          onClick={() => handleSectionClick('C')}
          className={`group relative bg-zinc-900 border transition-all duration-500 overflow-hidden cursor-pointer p-8 ${activeSection === 'C' ? 'border-white ring-1 ring-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-zinc-800 hover:border-zinc-600'}`}
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm transition-colors ${activeSection === 'C' ? 'bg-black text-white animate-pulse' : 'bg-white text-black'}`}>C</span>
            盲盒音樂交換
          </h3>
          <p className="text-zinc-500 mb-8">Blind Music Swap - 「音樂占卜」點擊開啟靈魂頻道，抽取一段與你共振的金句。</p>
          
          <div className={`min-h-[120px] border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${activeSection === 'C' ? 'border-neon-green' : 'border-zinc-800'}`}>
            {currentQuote ? (
              <p className="text-neon-green font-mono text-lg italic leading-relaxed">
                {currentQuote}{isTyping && <span className="animate-pulse">|</span>}
              </p>
            ) : (
              <p className="text-zinc-700 uppercase tracking-widest text-xs">{activeSection === 'C' ? 'Ready to decode...' : 'Frequency Dormant'}</p>
            )}
            <button 
              onClick={generateQuote}
              disabled={isTyping}
              className={`mt-6 px-6 py-2 font-bold uppercase text-sm transition-all ${activeSection === 'C' ? 'bg-neon-green text-black scale-110 shadow-lg' : 'bg-zinc-800 text-zinc-500'}`}
            >
              抽籤占卜 DRAW
            </button>
          </div>
        </div>

        {/* D. Beat Workshop */}
        <div 
          onClick={() => handleSectionClick('D')}
          className={`group relative bg-zinc-900 border transition-all duration-500 overflow-hidden cursor-pointer p-8 ${activeSection === 'D' ? 'border-neon-green ring-1 ring-neon-green shadow-[0_0_30px_rgba(173,255,47,0.1)]' : 'border-zinc-800 hover:border-zinc-600'}`}
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm transition-colors ${activeSection === 'D' ? 'bg-black text-neon-green animate-pulse' : 'bg-neon-green text-black'}`}>D</span>
            節拍工作坊
          </h3>
          <p className="text-zinc-500 mb-6">Synth & Gear Zone - 點擊同步強勁節拍，探索專業合成器與電子樂器的聲響工藝。</p>
          
          <div className="flex-1 relative overflow-hidden rounded group h-48">
            <img 
              src={SYNTH_IMAGES[synthIndex]} 
              className={`w-full h-full object-cover transition-all duration-700 ${activeSection === 'D' ? 'grayscale-0 scale-110 contrast-125' : 'grayscale group-hover:grayscale-0'}`}
              alt="Synthesizer"
            />
            {activeSection === 'D' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-2 bg-neon-green/30 animate-[ping_0.5s_infinite]"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <span className="text-[10px] font-mono text-zinc-400">BEAT_SYNC_0{synthIndex + 1}</span>
            </div>
          </div>
        </div>

      </div>

      {activeSection && (
        <div className="mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-2">
          <button 
            onClick={() => handleSectionClick(null)}
            className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span>Stop Audio Stream</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramSection;
