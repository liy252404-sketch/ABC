
import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import Intro from './components/Intro';
import ProgramSection from './components/ProgramSection';
import LineUpMap from './components/LineUpMap';
import Footer from './components/Footer';
import FaderNav from './components/FaderNav';
import TicketForm from './components/TicketForm';
import CountdownTimer from './components/CountdownTimer';

const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState<'landing' | 'tickets'>('landing');

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'landing') return;
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // 回到主頁並滾動到頂部
  const goToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen bg-[#0F172A] selection:bg-neon-green selection:text-[#0F172A]`}>
      {/* 倒數計時鬧鐘：始終維持在畫面上 */}
      <CountdownTimer />

      {/* Hero 鎖定畫面 */}
      <Hero isUnlocked={isUnlocked} onUnlock={handleUnlock} />

      {/* 購票表單頁面 (條件渲染) */}
      {isUnlocked && currentPage === 'tickets' && (
        <TicketForm onBack={goToLanding} />
      )}

      {/* 主內容 (Visible after unlock) */}
      <div className={`transition-all duration-1000 ${isUnlocked && currentPage === 'landing' ? 'opacity-100 blur-0' : 'opacity-0 blur-xl pointer-events-none fixed'}`}>
        <FaderNav progress={scrollProgress} />
        
        <main className="relative z-10">
          <section id="intro">
            <Intro />
          </section>
          
          <section id="programs">
            <ProgramSection />
          </section>

          <section id="lineup">
            <LineUpMap />
          </section>

          <Footer onTicketClick={() => setCurrentPage('tickets')} />
        </main>
      </div>
    </div>
  );
};

export default App;
