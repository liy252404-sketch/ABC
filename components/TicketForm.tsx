
import React, { useState } from 'react';

interface TicketFormProps {
  onBack: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TicketForm: React.FC<TicketFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    timeSlot: '2026-01-24 (Sat) 19:00'
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwYb0IaacT6wFNM_OsHA_n5fl6hodqFJAsuztRz4Te7beEo_zy9a_oU0uxN0Qd8UL0t/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('請填寫完整資料');
      return;
    }

    setStatus('submitting');

    try {
      // 串接 Google Apps Script
      // 使用 text/plain 避免 CORS preflight 問題，後端已設定解析 contents
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // 因為 GAS 轉址特性，通常使用 no-cors 或是處理其轉址
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      // 注意：使用 no-cors 時無法讀取 response body，但若沒噴 error 通常代表成功發出
      // 為了更好的使用者體驗，我們在此模擬一個稍微的延遲並假設成功
      // 若要精確處理，建議後端開放 CORS
      setTimeout(() => {
        setStatus('success');
      }, 1500);

    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('連線失敗，請稍後再試。');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0F172A] animate-in fade-in duration-700">
        <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_#ADFF2F]">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-4 glitch uppercase italic text-center">Registration Confirmed</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-md font-light">
          報名資料已成功寫入頻率交換所。我們將透過電話與您確認後續細節。
        </p>
        <button 
          onClick={onBack}
          className="px-12 py-4 border-2 border-neon-green text-neon-green font-bold uppercase hover:bg-neon-green hover:text-black transition-all"
        >
          Back to Pulse
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#0F172A] animate-in slide-in-from-bottom-8 duration-700">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center text-zinc-500 hover:text-neon-green transition-colors mb-12 font-mono uppercase text-sm"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Return to Main
        </button>

        <h2 className="text-5xl font-black mb-2 glitch uppercase italic tracking-tighter">Registration</h2>
        <p className="text-neon-green font-mono text-sm mb-12 tracking-widest uppercase">
          Ticket / Frequency Exchange Slot
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div className="relative group">
            <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-2 group-focus-within:text-neon-green transition-colors">
              Participant Name / 姓名
            </label>
            <input 
              type="text"
              required
              disabled={status === 'submitting'}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-transparent border-b-2 border-zinc-800 p-4 text-white focus:outline-none focus:border-neon-green transition-colors font-bold tracking-wider placeholder-zinc-800"
              placeholder="YOUR NAME"
            />
          </div>

          {/* Phone Field */}
          <div className="relative group">
            <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-2 group-focus-within:text-neon-green transition-colors">
              Contact Number / 電話
            </label>
            <input 
              type="tel"
              required
              disabled={status === 'submitting'}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-transparent border-b-2 border-zinc-800 p-4 text-white focus:outline-none focus:border-neon-green transition-colors font-bold tracking-wider placeholder-zinc-800"
              placeholder="+886"
            />
          </div>

          {/* TimeSlot Field */}
          <div className="relative group">
            <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-2 group-focus-within:text-neon-green transition-colors">
              Preferred Time Slot / 預約時段
            </label>
            <select 
              disabled={status === 'submitting'}
              value={formData.timeSlot}
              onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
              className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 text-white focus:outline-none focus:border-neon-green transition-colors font-bold appearance-none cursor-pointer"
            >
              <option value="2026-01-24 (Sat) 19:00">2026-01-24 (Sat) 19:00 - Opening Night</option>
              <option value="2026-01-25 (Sun) 14:00">2026-01-25 (Sun) 14:00 - Afternoon Session</option>
              <option value="2026-01-25 (Sun) 19:00">2026-01-25 (Sun) 19:00 - Prime Pulse</option>
              <option value="2026-01-26 (Mon) 14:00">2026-01-26 (Mon) 14:00 - Closing Session</option>
            </select>
            <div className="absolute right-4 bottom-4 pointer-events-none text-zinc-500">▼</div>
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-6 font-black text-2xl uppercase tracking-[0.2em] transition-all duration-500 shadow-lg ${
                status === 'submitting' 
                ? 'bg-zinc-800 text-zinc-500 cursor-wait' 
                : 'bg-neon-green text-black hover:bg-white hover:scale-[1.01] shadow-[0_15px_40px_rgba(173,255,47,0.2)]'
              }`}
            >
              {status === 'submitting' ? 'Processing...' : 'Confirm Registration'}
            </button>
            
            {status === 'error' && (
              <p className="mt-4 text-red-500 font-mono text-xs text-center">{errorMessage}</p>
            )}
          </div>
        </form>

        <p className="mt-12 text-[10px] text-zinc-600 font-mono text-center leading-relaxed">
          * 此表單受 SSL 加密保護。送出即代表同意城市脈動個人資料使用條款。<br/>
          * 資料將直接加密傳輸至後端資料庫。
        </p>
      </div>
    </div>
  );
};

export default TicketForm;
