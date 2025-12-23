
import React from 'react';

interface FooterProps {
  onTicketClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTicketClick }) => {
  return (
    <footer className="relative pt-32 pb-16 bg-[#0F172A] border-t-8 border-neon-green">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Map Info */}
          <div>
            <h2 className="text-4xl font-black mb-8 uppercase italic glitch">Location</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              臺北流行音樂中心 文化館 2F-3F<br/>
              台北市南港區忠孝東路七段99號
            </p>
            
            <div className="h-[400px] w-full rounded-xl overflow-hidden border border-zinc-800 relative group">
              <iframe 
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6738411090334!2d121.58784797607735!3d25.045137537841103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab630043c2c1%3A0x6b1602431787265c!2z6Ie65YyX5rWB6KGM6Z-z5qiC5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1715671151234!5m2!1szh-TW!2stw" 
                className="w-full h-full grayscale invert-[0.9] border-none"
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-4 border-neon-green/10 group-hover:border-neon-green/30 transition-all duration-300"></div>
            </div>
          </div>

          {/* CTA & Links */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-black mb-8 uppercase italic">Sign In</h2>
            <p className="text-zinc-500 mb-12">
              早鳥預約：$800 | 一般報名：$1,200<br/>
              含限定單曲卡帶一捲與活動專屬 Zine 一本。
            </p>
            
            <button 
              onClick={onTicketClick}
              className="block w-full py-6 bg-neon-green text-black text-center font-black text-2xl uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_20px_50px_rgba(173,255,47,0.3)] mb-12"
            >
              SIGN IN 報名
            </button>

            <div className="flex items-center space-x-8">
              <a href="#" className="text-zinc-400 hover:text-neon-green transition-colors font-mono uppercase text-sm">Instagram</a>
              <a href="#" className="text-zinc-400 hover:text-neon-green transition-colors font-mono uppercase text-sm">Facebook</a>
              <a href="#" className="text-zinc-400 hover:text-neon-green transition-colors font-mono uppercase text-sm">Spotify</a>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-zinc-900 flex flex-col md:row justify-between items-center text-[10px] text-zinc-600 font-mono gap-4">
          <div className="uppercase">© 2026 City Pulse: Frequency Exchange. All Rights Reserved.</div>
          <div className="flex space-x-4">
            <span>BITRATE: 320KBPS</span>
            <span>SAMPLE RATE: 44.1KHZ</span>
            <span>ENCODING: UTF-8</span>
          </div>
        </div>
        
      </div>

      <div className="absolute bottom-0 left-0 text-[15vw] leading-none font-black text-zinc-900/10 pointer-events-none select-none -z-10 uppercase italic overflow-hidden whitespace-nowrap">
        Frequency Exchange Pulse Pulse Pulse
      </div>
    </footer>
  );
};

export default Footer;
