
import React, { useState } from 'react';
import { LINEUP_ARTISTS, MARKET_BOOTHS, Artist } from '../constants';

const LineUpMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'staff' | 'list' | 'real'>('staff');
  const [hoveredBooth, setHoveredBooth] = useState<number | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // 模擬平面圖座標
  const boothPositions = [
    { id: 1, x: 25, y: 30 },
    { id: 2, x: 35, y: 30 },
    { id: 3, x: 45, y: 30 },
    { id: 4, x: 25, y: 45 },
    { id: 5, x: 70, y: 65 }, // Coffee near stage
    { id: 6, x: 70, y: 75 },
    { id: 7, x: 45, y: 75 },
    { id: 8, x: 35, y: 75 },
  ];

  return (
    <div className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Line-up Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-8 glitch uppercase italic">Line-up</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LINEUP_ARTISTS.map((artist, i) => (
              <div 
                key={i} 
                className="group cursor-pointer"
                onClick={() => setSelectedArtist(artist)}
              >
                {/* 增加基本亮度從 text-zinc-800 改為 text-zinc-500 */}
                <div className="text-2xl md:text-4xl font-bold text-zinc-500 group-hover:text-neon-green transition-colors duration-300 uppercase">
                  {artist.name}
                </div>
                <div className="h-1 w-0 group-hover:w-full bg-neon-green transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Map */}
        <div className="relative border-t border-zinc-800 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter">Market Map</h3>
              <p className="text-zinc-500 font-mono">五線譜創意地圖 / Musical Staff Mapping</p>
            </div>
            <div className="flex space-x-2 bg-zinc-900 p-1 rounded border border-zinc-800">
              <button 
                onClick={() => setViewMode('staff')}
                className={`px-4 py-1 text-xs font-bold uppercase transition-all ${viewMode === 'staff' ? 'bg-neon-green text-black' : 'text-zinc-500'}`}
              >
                Staff
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-1 text-xs font-bold uppercase transition-all ${viewMode === 'list' ? 'bg-neon-green text-black' : 'text-zinc-500'}`}
              >
                List
              </button>
              <button 
                onClick={() => setViewMode('real')}
                className={`px-4 py-1 text-xs font-bold uppercase transition-all ${viewMode === 'real' ? 'bg-neon-green text-black' : 'text-zinc-500'}`}
              >
                Floor Plan
              </button>
            </div>
          </div>

          <div className="min-h-[500px] bg-zinc-900/50 rounded-xl p-4 md:p-8 border border-zinc-800/50 overflow-hidden relative flex items-center justify-center">
            
            {/* VIEW: STAFF */}
            {viewMode === 'staff' && (
              <div className="relative w-full h-64 flex flex-col justify-between py-10 overflow-hidden animate-in fade-in duration-500">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-zinc-800 shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
                ))}
                {MARKET_BOOTHS.map((booth, i) => (
                  <div 
                    key={i}
                    className="absolute group cursor-pointer"
                    style={{ left: `${10 + (i * 12)}%`, top: `${15 + (Math.sin(i) * 30 + 30)}%` }}
                  >
                    <div className="w-6 h-4 bg-neon-green rounded-full rotate-[-20deg] shadow-[0_0_15px_rgba(173,255,47,0.5)] flex items-center justify-center overflow-hidden">
                       <span className="text-[6px] font-bold text-black rotate-[20deg]">{booth.id}</span>
                    </div>
                    <div className="absolute h-12 w-px bg-zinc-400 -top-12 right-0 origin-bottom"></div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-neon-green text-black text-xs font-bold px-3 py-1 whitespace-nowrap rounded">
                        {booth.name}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-7xl font-serif text-zinc-800 select-none">∮</div>
              </div>
            )}
            
            {/* VIEW: LIST */}
            {viewMode === 'list' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {MARKET_BOOTHS.map((booth, i) => (
                  <div key={i} className="flex items-center p-4 bg-zinc-900 border border-zinc-800 hover:border-neon-green transition-colors">
                    <span className="text-neon-green font-mono mr-4 text-xl">#{booth.id}</span>
                    <span className="font-bold">{booth.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW: REAL FLOOR PLAN */}
            {viewMode === 'real' && (
              <div className="relative w-full max-w-4xl aspect-[16/10] bg-zinc-950/80 border border-zinc-800 rounded-lg p-4 animate-in zoom-in-95 duration-500">
                {/* SVG Floor Plan Background */}
                <svg viewBox="0 0 100 60" className="w-full h-full text-zinc-800" fill="none" stroke="currentColor" strokeWidth="0.2">
                   {/* Venue Walls */}
                   <path d="M10,10 L90,10 L90,50 L50,50 L50,55 L10,55 Z" strokeWidth="0.5" />
                   {/* Partitions */}
                   <line x1="10" y1="20" x2="60" y2="20" />
                   <line x1="60" y1="10" x2="60" y2="40" />
                   <line x1="30" y1="40" x2="90" y2="40" />
                   
                   {/* Labels */}
                   <text x="12" y="18" fill="currentColor" fontSize="2" className="font-mono">ENTRANCE</text>
                   <text x="88" y="48" fill="currentColor" fontSize="2" textAnchor="end" className="font-mono">MAIN STAGE</text>
                   <text x="12" y="53" fill="currentColor" fontSize="2" className="font-mono">EXCHANGE ZONE</text>
                </svg>

                {/* Booth Points */}
                {boothPositions.map((pos) => {
                  const boothInfo = MARKET_BOOTHS.find(b => b.id === pos.id);
                  return (
                    <div 
                      key={pos.id}
                      className="absolute group"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      onMouseEnter={() => setHoveredBooth(pos.id)}
                      onMouseLeave={() => setHoveredBooth(null)}
                    >
                      <div className={`w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center border-2 ${hoveredBooth === pos.id ? 'bg-neon-green border-white scale-150 shadow-[0_0_20px_#ADFF2F]' : 'bg-zinc-900 border-neon-green'}`}>
                        <span className={`text-[6px] font-bold ${hoveredBooth === pos.id ? 'text-black' : 'text-neon-green'}`}>{pos.id}</span>
                      </div>
                      
                      {/* Booth Info Card */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-3 bg-black/90 border border-neon-green rounded text-xs transition-all duration-300 pointer-events-none z-50 min-w-[120px] ${hoveredBooth === pos.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <div className="text-neon-green font-mono mb-1">BOOTH #{pos.id}</div>
                        <div className="font-bold text-white whitespace-nowrap">{boothInfo?.name}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Stage Area Highlight */}
                <div className="absolute top-[40%] right-[10%] w-[15%] h-[15%] border-2 border-dashed border-zinc-700 flex items-center justify-center text-[10px] text-zinc-600 font-mono rotate-12">
                   LIVE ZONE
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Artist Detail Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedArtist(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-neon-green/30 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative group">
              <img 
                src={selectedArtist.photo} 
                alt={selectedArtist.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <button 
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-4xl md:text-6xl font-black mb-6 glitch uppercase italic tracking-tighter">
                {selectedArtist.name}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedArtist.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-neon-green/10 text-neon-green border border-neon-green/30 rounded text-[10px] font-mono uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed mb-12 font-light">
                {selectedArtist.bio}
              </p>

              <button 
                onClick={() => setSelectedArtist(null)}
                className="w-full py-4 border border-zinc-700 hover:border-neon-green hover:text-neon-green transition-all uppercase font-bold tracking-widest text-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineUpMap;
