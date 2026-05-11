import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function PanelPage({ onOpenModal }) {
  const [user, setUser] = useState({ firstName: "Öğrenci", lastName: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Hepsi");
  const [globalSearch, setGlobalSearch] = useState("");
  
  // --- CHAT MOTORU STATE'LERİ ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null); 
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  const [chatContacts] = useState([
    { id: 1, name: "Ahmet Yılmaz", initials: "AY", color: "bg-purple-500", isOnline: true },
    { id: 2, name: "Selin Kaya", initials: "SK", color: "bg-green-500", isOnline: false },
    { id: 3, name: "Can Öz", initials: "CÖ", color: "bg-orange-500", isOnline: true }
  ]);

  const [chatHistories, setChatHistories] = useState({
    1: [
      { id: 1, text: "Naber? Akşamki maça geliyor musun?", sender: "them", time: "19:00" },
      { id: 2, text: "Aynen geliyorum, kramponları hazırladım bile! ⚽", sender: "me", time: "19:05" }
    ],
    2: [
      { id: 1, text: "Notları sisteme yükledin mi?", sender: "them", time: "14:30" },
      { id: 2, text: "Evet yükledim, 3. haftanın klasöründe bulabilirsin.", sender: "me", time: "14:35" }
    ],
    3: []
  });

  // --- SAĞ KOLON (ÖNERİLER) STATE'İ ---
  const [suggestions, setSuggestions] = useState([
    { id: 101, name: "Mehmet Demir", initials: "MD", color: "bg-teal-500", reason: "Senin gibi 'Strateji Oyunları' seviyor" },
    { id: 102, name: "Zeynep Çelik", initials: "ZÇ", color: "bg-pink-500", reason: "Bilgisayar Mühendisliği bölümünde" },
    { id: 103, name: "Burak Taş", initials: "BT", color: "bg-indigo-500", reason: "3 ortak arkadaşınız var" }
  ]);

  const handleAddFriend = (id) => {
    // Ekle butonuna basılınca listeden çıkar
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistories, activeChat]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ firstName: parsedUser.firstName || parsedUser.first_name || "Öğrenci", lastName: parsedUser.lastName || parsedUser.last_name || "" });
      } catch (error) { console.error("Kullanıcı verisi okunamadı:", error); }
    }
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChat) return;
    const newMessage = { id: Date.now(), text: chatInput, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistories(prev => ({ ...prev, [activeChat.id]: [...(prev[activeChat.id] || []), newMessage] }));
    setChatInput("");
  };

  const basHarf = user.firstName.charAt(0).toUpperCase();
  const categories = ["Hepsi", "Kulüp Etkinlikleri", "Ders Çalışma", "Spor & Oyun", "Parti & Eğlence"];
  
  const allEvents = [
    { id: 1, category: "Kulüp Etkinlikleri", badge: "Yazılım Kulübü", badgeColor: "text-blue-400 bg-blue-500/10", time: "2 saat önce", title: "React ve Vite ile Frontend Atölyesi", desc: "Lab-3'te toplanıp web uygulamaları geliştireceğiz. Tailwind CSS de cabası!", participants: 15, btn: "Katıl", btnColor: "bg-gray-800 hover:bg-blue-600 text-white" },
    { id: 2, category: "Spor & Oyun", badge: "Spor", badgeColor: "text-red-400 bg-red-500/10", time: "10 dk önce", title: "Halı Saha Maçı - Acil Adam Lazım!", desc: "Kampüs sahasında akşam 8 maçı için 2 kişi eksik.", participants: 0, btn: "İletişime Geç", btnColor: "bg-red-600/20 border border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white" },
    { id: 3, category: "Ders Çalışma", badge: "Kütüphane", badgeColor: "text-green-400 bg-green-500/10", time: "1 saat önce", title: "Algoritma Analizi Final Hazırlığı", desc: "Merkez kütüphanede toplu soru çözümü yapacağız.", participants: 8, btn: "Katıl", btnColor: "bg-gray-800 hover:bg-green-600 text-white" }
  ];

  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = activeCategory === "Hepsi" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(globalSearch.toLowerCase()) || event.desc.toLowerCase().includes(globalSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0f172a] text-white min-h-screen relative">
      
      {/* Üst Gezinme Çubuğu */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <Link to="/panel" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg shadow-lg"></div>
            <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500 hidden sm:block">CoF CAMPUS</h1>
          </Link>

          <div className="flex-1 max-w-md relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input type="text" placeholder="Kampüste etkinlik veya kişi ara..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>

          <div className="flex gap-4 items-center shrink-0">
            <button onClick={onOpenModal} className="bg-gradient-to-r from-blue-600 to-red-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform hidden sm:block shadow-lg shadow-blue-900/20">+ Etkinlik</button>
            <Link to="/profil" className="flex items-center gap-3 hover:opacity-80 transition-opacity bg-slate-800/50 pl-3 pr-1 py-1 rounded-full border border-slate-700">
              <span className="hidden md:block font-bold text-sm text-slate-200">{user.firstName}</span>
              {profilePic ? <img src={profilePic} alt="Profil" className="w-9 h-9 rounded-full object-cover border-2 border-blue-500" /> : <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center font-bold text-sm text-blue-400">{basHarf}</div>}
            </Link>
          </div>
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6">
        
        {/* SOL KOLON: KATEGORİLER */}
        <aside className="w-full lg:w-1/4 space-y-4">
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800 shadow-xl">
            <h3 className="font-bold mb-4 text-slate-500 uppercase text-xs tracking-widest">Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}><button onClick={() => setActiveCategory(cat)} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeCategory === cat ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'hover:bg-slate-800 text-slate-400 border border-transparent'}`}># {cat}</button></li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ORTA KOLON: ETKİNLİK AKIŞI */}
        <section className="w-full lg:w-2/4 space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 text-center text-slate-500">Aradığın kritere uygun etkinlik bulunamadı.</div>
          ) : (
            filteredEvents.map(event => (
              <div key={event.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-colors shadow-xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`${event.badgeColor} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-current opacity-80`}>{event.badge}</span>
                    <span className="text-slate-500 text-xs font-medium">{event.time}</span>
                  </div>
                  <h2 className="text-2xl font-black mb-2 text-slate-100">{event.title}</h2>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{event.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    {event.participants > 0 ? (
                      <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-900"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-slate-900"></div>
                        <div className="text-xs font-bold text-slate-500 self-center ml-4">+{event.participants} Katılımcı</div>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-slate-500">İlk sen katıl!</div>
                    )}
                    <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-auto shadow-lg ${event.btnColor}`}>{event.btn}</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* SAĞ KOLON: ÖNERİLER VE LİDERLİK TABLOSU */}
        <aside className="hidden lg:block w-1/4 space-y-6">
          
          {/* 1. Tanıyor Olabileceğin Kişiler */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">Tanıyor Olabileceğin Kişiler</h3>
            <div className="space-y-4">
              {suggestions.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center">Şimdilik yeni öneri yok.</p>
              ) : (
                suggestions.map(person => (
                  <div key={person.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${person.color} flex items-center justify-center font-bold text-sm shadow-inner shrink-0`}>
                        {person.initials}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-sm font-bold text-slate-200 truncate">{person.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate" title={person.reason}>{person.reason}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddFriend(person.id)}
                      className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg text-xs font-bold transition-all shadow-lg shrink-0 ml-2"
                      title="Arkadaş Ekle"
                    >
                      Ekle
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Kampüs Trendleri */}
          <div className="bg-gradient-to-br from-blue-900/10 to-red-900/10 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">🔥 Kampüs Trendleri</h3>
            <ul className="space-y-3">
              <li className="group cursor-pointer">
                <div className="flex justify-between items-center text-sm font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
                  <span className="truncate pr-2">1. Bahar Şenliği Ön Partisi</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">340 Katılımcı</span>
              </li>
              <li className="group cursor-pointer mt-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-300 group-hover:text-red-400 transition-colors">
                  <span className="truncate pr-2">2. E-Spor Turnuvası Finali</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">185 Katılımcı</span>
              </li>
              <li className="group cursor-pointer mt-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-300 group-hover:text-green-400 transition-colors">
                  <span className="truncate pr-2">3. Yapay Zeka Zirvesi</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">120 Katılımcı</span>
              </li>
            </ul>
          </div>

          {/* 3. Haftanın Liderleri */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-4">🏆 Haftanın Liderleri</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-xl border border-amber-500/20">
                <span className="text-xl">🥇</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xs border border-amber-500/50">EK</div>
                <div>
                  <p className="text-xs font-bold text-amber-500">Emre Kaya</p>
                  <p className="text-[9px] text-slate-500">1450 Puan</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-xl border border-slate-400/20">
                <span className="text-xl">🥈</span>
                <div className="w-8 h-8 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-300 font-bold text-xs border border-slate-400/50">MB</div>
                <div>
                  <p className="text-xs font-bold text-slate-300">Merve Bal</p>
                  <p className="text-[9px] text-slate-500">1200 Puan</p>
                </div>
              </div>
            </div>
          </div>

        </aside>
      </main>

      {/* --- AÇILIR SOHBET (CHAT) PENCERESİ (Aynı Kod) --- */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[100] flex flex-col h-[480px] overflow-hidden">
          <div className="bg-slate-800/80 p-4 border-b border-slate-700 flex justify-between items-center backdrop-blur-md">
            {activeChat ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="text-slate-400 hover:text-white transition-colors">←</button>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full ${activeChat.color} flex items-center justify-center text-xs font-bold`}>{activeChat.initials}</div>
                    {activeChat.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>}
                  </div>
                  <h3 className="font-bold text-white text-sm">{activeChat.name}</h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <h3 className="font-bold text-white text-sm">Mesajlar</h3>
              </div>
            )}
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-red-400 transition-colors text-lg">✕</button>
          </div>
          
          <div className="flex-1 bg-slate-900 overflow-hidden flex flex-col">
            {!activeChat ? (
              <div className="overflow-y-auto h-full custom-scrollbar">
                {chatContacts.map(contact => {
                  const lastMsg = chatHistories[contact.id]?.slice(-1)[0];
                  return (
                    <div key={contact.id} onClick={() => setActiveChat(contact)} className="flex items-center gap-3 p-4 hover:bg-slate-800/50 cursor-pointer border-b border-slate-800/30 transition-colors">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl ${contact.color} flex items-center justify-center font-bold text-lg shadow-inner`}>{contact.initials}</div>
                        {contact.isOnline && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-[3px] border-slate-900 rounded-full"></div>}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-sm text-slate-200">{contact.name}</h4>
                          {lastMsg && <span className="text-[10px] text-slate-500">{lastMsg.time}</span>}
                        </div>
                        <p className="text-xs text-slate-400 truncate">{lastMsg ? (lastMsg.sender === "me" ? `Sen: ${lastMsg.text}` : lastMsg.text) : "Sohbeti başlat..."}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/50">
                {chatHistories[activeChat.id]?.length === 0 ? (
                  <p className="text-center text-xs text-slate-500 italic mt-10">Burada sessizlik hakim. Bir "Merhaba" de!</p>
                ) : (
                  chatHistories[activeChat.id]?.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}>
                      {msg.sender === "them" && (<div className={`w-6 h-6 rounded-full ${activeChat.color} shrink-0 flex items-center justify-center text-[10px] font-bold mt-auto`}>{activeChat.initials}</div>)}
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm relative ${msg.sender === "me" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"}`}>
                        {msg.text}
                        <span className={`block text-[9px] mt-1 text-right ${msg.sender === "me" ? "text-blue-200" : "text-slate-500"}`}>{msg.time}</span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {activeChat && (
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-700 bg-slate-800 flex gap-2">
              <input type="text" placeholder="Mesaj yaz..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition-colors" />
              <button type="submit" disabled={!chatInput.trim()} className="bg-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">Gönder</button>
            </form>
          )}
        </div>
      )}

      {/* FLOATING CHAT BUTONU */}
      <button onClick={() => { setIsChatOpen(!isChatOpen); setActiveChat(null); }} className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.5)] flex items-center justify-center text-3xl hover:scale-110 hover:-translate-y-1 transition-all z-[100] border-2 border-white/10">
        💬
      </button>

    </div>
  );
}

export default PanelPage;