
export const QUOTES = [
  "在擁擠的車廂裡，聽見屬於你的頻率。",
  "城市是最大的合成器，我們是其中的電壓。",
  "遺忘也是一種頻率，只是我們還沒捕捉到。",
  "今晚的 Bpm 是 128，那是靈魂加速的聲音。",
  "聲音是有溫度的，特別是在冰冷的捷運月台。",
  "你聽到的不是噪音，是未被解碼的訊息。",
  "讓頻率交織，直到我們成為同一個脈動。"
];

export interface Artist {
  name: string;
  photo: string;
  bio: string;
  tags: string[];
}

export const LINEUP_ARTISTS: Artist[] = [
  { 
    name: "Analog Dreams", 
    photo: "https://images.unsplash.com/photo-1514525253344-f814d074358a?auto=format&fit=crop&q=80&w=800",
    bio: "致力於重現 80 年代類比合成器的溫暖音色，將復古波形注入現代城市節拍。",
    tags: ["Synthwave", "Analog", "Retrofuturism"]
  },
  { 
    name: "Circuit Breaker", 
    photo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    bio: "實驗電子樂先行者，擅長利用硬體電路故障產生的隨機聲響進行即時編碼創作。",
    tags: ["Glitch", "Experimental", "Live Coding"]
  },
  { 
    name: "Neon Pulse", 
    photo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    bio: "以極簡主義為核心，透過深邃的低音頻率探索城市夜晚的孤獨與共鳴。",
    tags: ["Minimal Techno", "Deep House", "Ambient"]
  },
  { 
    name: "Sub-Zero Bass", 
    photo: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
    bio: "專注於物理感官的震撼，低於 40Hz 的音頻輸出，挑戰聽覺與觸覺的邊界。",
    tags: ["Dubstep", "Bass Music", "Industrial"]
  },
  { 
    name: "Ambient Echo", 
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
    bio: "採集台灣各地的環境音景，揉合鋼琴旋律，打造心靈洗滌的聲音地景。",
    tags: ["Ambient", "Field Recording", "Piano"]
  },
  { 
    name: "Glitch Factory", 
    photo: "https://images.unsplash.com/photo-1520156557489-3176620524da?auto=format&fit=crop&q=80&w=800",
    bio: "數位美學的解構者，將聲音碎裂後重新拼貼，呈現出超現實的聽覺迷宮。",
    tags: ["IDM", "Deconstructed", "Digital Art"]
  },
  { 
    name: "Frequency 7", 
    photo: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800",
    bio: "由七位跨界藝術家組成的聲音團隊，結合影像與舞蹈的沈浸式電子演出。",
    tags: ["Audio Visual", "Performance", "Crossover"]
  },
  { 
    name: "Pulse Operator", 
    photo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    bio: "模組合成器的操作專家，每一場演出都是不可複製的即興頻率交換。",
    tags: ["Modular Synth", "Improvisation", "Hardware"]
  }
];

export const MARKET_BOOTHS = [
  { id: 1, name: "Vinyl Soul Record Shop" },
  { id: 2, name: "Modular Synth Zone" },
  { id: 3, name: "Retro Tape Archive" },
  { id: 4, name: "Sound Design Book Lab" },
  { id: 5, name: "Cyberpunk Coffee" },
  { id: 6, name: "Neon Apparel" },
  { id: 7, name: "Frequency Exchange Post" },
  { id: 8, name: "Experimental Gear Hub" }
];

export const SYNTH_IMAGES = [
  "https://picsum.photos/id/1082/800/600",
  "https://picsum.photos/id/101/800/600",
  "https://picsum.photos/id/12/800/600",
  "https://picsum.photos/id/2/800/600"
];

export const VINYL_IMAGES = [
  "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400"
];
