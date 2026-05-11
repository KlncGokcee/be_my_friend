import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- BAŞARIMLAR (ROZETLER) VERİTABANI ---
const achievementsList = [
  // Genel Etkinlikler
  { id: 1, title: "İlk Adım", desc: "Uygulama üzerinden ilk defa bir etkinliğe katıldın veya oluşturdun.", icon: "🌱", unlocked: true },
  { id: 2, title: "Sosyal Kelebek", desc: "1 hafta içinde 5 farklı türde etkinliğe katıldın.", icon: "🦋", unlocked: true },
  { id: 3, title: "Etkinlik Tutkulusu", desc: "50 etkinliğe katılma başarımı.", icon: "🔥", unlocked: false },
  { id: 4, title: "Etkinlik Canavarı", desc: "100 etkinliğe katılma başarımı.", icon: "🐉", unlocked: false },
  { id: 5, title: "Kampüs Rehberi", desc: "Oluşturduğun etkinliklere toplamda 70 veya üzeri kişi katıldı.", icon: "🗺️", unlocked: false },
  { id: 6, title: "Gezgin Öğrenci", desc: "Kampüsün 5 farklı mekanında etkinliklere katıldın.", icon: "🎒", unlocked: false },
  { id: 7, title: "Yenilmez Armada", desc: "Turnuva veya rekabetçi oyunlarda üst üste 5 kez birinci oldun.", icon: "🏆", unlocked: false },
  { id: 8, title: "Etkinlik Yoldaşı", desc: "Aynı arkadaşınla 5 farklı oyun etkinliğine katıldın.", icon: "🤝", unlocked: true },
  { id: 9, title: "Gece Kuşu", desc: "00:00’dan sonra başlayan bir etkinliğe katıldın.", icon: "🦉", unlocked: true },
  
  // Satranç
  { id: 10, title: "Gürbüz!!!", desc: "Satranç etkinliklerinde üst üste 3 rakibi yendin.", icon: "♟️", unlocked: true },
  { id: 11, title: "Usta Avcısı", desc: "Kendinden daha fazla rakip yenmiş bir kişiyi yendin.", icon: "🎯", unlocked: false },
  { id: 12, title: "Açılış Teorisyeni", desc: "5 farklı satranç buluşmasına katıldın.", icon: "📖", unlocked: false },
  { id: 13, title: "Farklı Masalar", desc: "1 hafta içerisinde 10 farklı satranç rakibiyle oynadın.", icon: "👥", unlocked: false },
  
  // Takım Oyunları & Spor (Voleybol, Tenis)
  { id: 14, title: "12. Adam / Joker", desc: "Kontenjanı dolmamış bir maça son 1 saat içinde katıldın.", icon: "🃏", unlocked: true },
  { id: 15, title: "Kaptan-ı Derya", desc: "Tam kadro oynanan 15 halı saha veya voleybol maçı organize ettin.", icon: "⚓", unlocked: false },
  { id: 16, title: "File Bekçisi (Altın)", desc: "Voleybol etkinliklerinde 50 katılıma ulaştın.", icon: "🏐", unlocked: false },
  { id: 17, title: "Tenis Yıldızı (Altın)", desc: "Tenis etkinliklerine 100 kez katıldın.", icon: "🎾", unlocked: false },
  { id: 18, title: "Rövanş Vakti", desc: "Aynı kişiyle üst üste 3 kez tenis etkinliğinde eşleştin.", icon: "🔄", unlocked: false },
  
  // Yazılım ve Bilgisayar Bilimleri
  { id: 19, title: "Bug Avcısı", desc: "Yazılım, proje veya teknoloji buluşmalarına 10 kez katıldın.", icon: "🐛", unlocked: true },
  { id: 20, title: "Otomataların Efendisi", desc: "Algoritma veya teorik bilgisayar bilimleri odaklı 5 gruba katıldın.", icon: "⚙️", unlocked: true },
  { id: 21, title: "Full-Stack Öğrenci", desc: "Hem Front-end hem Back-end etiketli etkinliklere katıldın.", icon: "💻", unlocked: true },
  { id: 22, title: "Açık Kaynak Gönüllüsü", desc: "Başkalarının kodlama atölyelerine veya projelerine 20 kez katıldın.", icon: "🌐", unlocked: false },
  { id: 23, title: "Dark Mode", desc: "Gece yarısı 00:00'dan sonra başlayan 2 saatlik kodlama etkinliğine katıldın.", icon: "🌙", unlocked: false },
  
  // Sanatsal & Kültür
  { id: 24, title: "Sinefil", desc: "1 hafta içerisinde 3 farklı sinema veya film gecesine katıldın.", icon: "🎬", unlocked: false },
  { id: 25, title: "Kültür Elçisi", desc: "10 farklı tiyatro, konser veya sergi organize ettin.", icon: "🎭", unlocked: false },
  { id: 26, title: "Kafkaesk", desc: "5 farklı kitap inceleme veya felsefe buluşmasına katıldın.", icon: "📚", unlocked: true },
  { id: 27, title: "Eleştirmen", desc: "10 farklı film veya kitap inceleme etkinliğine katılıp yorum yaptın.", icon: "🧐", unlocked: false },
  { id: 28, title: "Festival Ruhu", desc: "Kampüsteki veya şehirdeki konser etkinliklerine 7 kez katıldın.", icon: "🎸", unlocked: false },
  
  // Gizli Başarımlar
  { id: 29, title: "At Gözlüğü", desc: "Başka hiçbir etkinliğe katılmadan aynı etkinliğe 3 kere katıldın.", icon: "🐴", unlocked: true, isSecret: true },
  { id: 30, title: "Gizemli Yabancı", desc: "Hiç tanımadığın 10 farklı kişinin etkinliğine peş peşe katıldın.", icon: "🕵️‍♂️", unlocked: false, isSecret: true },
  { id: 31, title: "Grammer Nazisi", desc: "Başlığında/açıklamasında yazım hatası olan bir dil etkinliğine katıldın.", icon: "📝", unlocked: true, isSecret: true },
  
  // Kutu Oyunları, Yabancı Dil & Doğa
  { id: 32, title: "Strateji Dehası", desc: "Strateji veya kutu oyunları etkinliklerine 10 kez katıldın.", icon: "🎲", unlocked: false },
  { id: 33, title: "Zar Tutmayan", desc: "10 farklı kutu oyunu buluşmasına katıldın.", icon: "🎰", unlocked: false },
  { id: 34, title: "Dil Pratiği Uzmanı", desc: "Dil kulübü etkinliklerine 5 hafta üst üste kesintisiz katıldın.", icon: "🗣️", unlocked: false },
  { id: 35, title: "Polyglot", desc: "En az 3 farklı dilin pratik veya çalışma etkinliğine katıldın.", icon: "🌍", unlocked: true },
  { id: 36, title: "Doğa Dostu", desc: "Bisiklet veya doğa yürüyüşü etkinliklerine 1 ay içinde 4 kez katıldın.", icon: "🌲", unlocked: false }
];

function Profilim() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Öğrenci", lastName: "", email: "", department: "Bilgisayar Mühendisliği",
    grade: "3. Sınıf", birthday: "2003-08-26", interests: "React, Haskell, Strateji Oyunları, Seyahat",
    desiredEvents: "Yazılım Zirveleri, Hackathonlar", contactInfo: "github.com/kullanici", participationRate: 85,
    bio: "Karadeniz Teknik Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Web geliştirme (React, Tailwind) ve teorik bilgisayar bilimlerine ilgi duyuyorum. Boş vakitlerimde strateji ve aksiyon oyunları oynarım."
  });

  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);

  const [recentEvents] = useState([
    { id: 1, title: "Haskell ve Fonksiyonel Programlama Zirvesi", date: "3 gün önce", type: "Eğitim", color: "text-blue-400 bg-blue-500/10" },
    { id: 2, title: "Dying Light Co-op LAN Party", date: "1 hafta önce", type: "Oyun", color: "text-purple-400 bg-purple-500/10" },
    { id: 3, title: "KTU Bilgisayar Kulübü Tanışma", date: "2 hafta önce", type: "Sosyal", color: "text-green-400 bg-green-500/10" }
  ]);

  const [comments, setComments] = useState([{ id: 1, author: "Ahmet Y.", text: "Halı sahada defansın bel kemiği! +rep", date: "2 gün önce", visibility: "public" }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState([{ id: 1, name: "Ahmet Yılmaz", initials: "AY", isFriend: true, color: "bg-purple-500" }, { id: 2, name: "Selin Kaya", initials: "SK", isFriend: true, color: "bg-green-500" }]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(prev => ({ ...prev, firstName: parsedUser.firstName || parsedUser.first_name || "Öğrenci", lastName: parsedUser.lastName || parsedUser.last_name || "", email: parsedUser.email || parsedUser.ktu_email || "Email belirtilmedi" }));
      } catch (error) { console.error("Veri okunamadı:", error); }
    }
  }, []);

  const handleSave = () => { setIsEditing(false); alert("Profil güncellendi!"); };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => { setProfilePic(reader.result); localStorage.setItem("profilePic", reader.result); }; reader.readAsDataURL(file); }
  };

  const handleDeleteComment = (commentId) => { if(window.confirm("Bu yorumu silmek istediğine emin misin?")) setComments(comments.filter(c => c.id !== commentId)); };
  const handleToggleVisibility = (commentId) => { setComments(comments.map(c => c.id === commentId ? { ...c, visibility: c.visibility === "public" ? "private" : "public" } : c)); };
  const toggleFriendStatus = (id) => { setFriends(friends.map(f => f.id === id ? { ...f, isFriend: !f.isFriend } : f)); };

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const basHarfler = `${user.firstName.charAt(0)}${user.lastName ? user.lastName.charAt(0) : ''}`.toUpperCase();

  const unlockedCount = achievementsList.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-6 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">
          <Link to="/panel" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg"></div>
            <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">CoF CAMPUS</h1>
          </Link>
          <Link to="/panel" className="px-6 py-2 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800/70 transition-all text-sm font-bold">← PANELE DÖN</Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SOL KOLON (Kişisel Bilgiler, Hakkımda, Etkinlikler, Yorum Duvarı) */}
          <div className="lg:col-span-2 space-y-6">
            
            <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl">
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {isEditing ? 'DEĞİŞİKLİKLERİ KAYDET' : 'PROFİLİ DÜZENLE'}
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group w-32 h-32 rounded-3xl shadow-lg border-2 border-transparent hover:border-blue-500 transition-all shrink-0">
                  {profilePic ? <img src={profilePic} alt="Profil" className="w-full h-full object-cover rounded-3xl" /> : <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center text-4xl font-black rounded-3xl">{basHarfler}</div>}
                  {isEditing && <label className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm"><span className="text-white text-xs font-bold text-center tracking-widest">FOTOĞRAF<br/>YÜKLE</span><input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} /></label>}
                </div>

                <div className="text-center md:text-left space-y-3 flex-1">
                  <h2 className="text-4xl font-black">{user.firstName} {user.lastName}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 text-sm">
                    {isEditing ? <input className="bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-blue-500" value={user.department} onChange={(e) => setUser({...user, department: e.target.value})} /> : <span>📍 {user.department}</span>}
                    {isEditing ? <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-blue-500" value={user.grade} onChange={(e) => setUser({...user, grade: e.target.value})}><option>1. Sınıf</option><option>2. Sınıf</option><option>3. Sınıf</option><option>4. Sınıf</option><option>Mezun</option></select> : <span>🎓 {user.grade}</span>}
                  </div>
                  
                  <div className="mt-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-800/50">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Hakkımda</h4>
                    {isEditing ? (
                      <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm outline-none focus:border-blue-500 text-slate-300" rows="3" value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} placeholder="Kendinden biraz bahset..."></textarea>
                    ) : (
                      <p className="text-sm text-slate-300 leading-relaxed italic">"{user.bio}"</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800 pt-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Doğum Tarihi</h4>
                  {isEditing ? <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none" value={user.birthday} onChange={(e) => setUser({...user, birthday: e.target.value})} /> : <p className="text-lg font-semibold">{user.birthday}</p>}
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">İletişim / Sosyal</h4>
                  {isEditing ? <input className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none" value={user.contactInfo} onChange={(e) => setUser({...user, contactInfo: e.target.value})} /> : <p className="text-lg font-semibold text-blue-400">{user.contactInfo}</p>}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 tracking-widest">Son Katıldığım Etkinlikler</h3>
              <div className="space-y-3">
                {recentEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-800/50 hover:border-slate-700 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-200">{event.title}</h4>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{event.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.color}`}>{event.type}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Duvar (Yorumlar) */}
            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 tracking-widest">Yorumlar (Wall)</h3>
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className={`flex gap-4 p-4 rounded-2xl border transition-all ${comment.visibility === 'private' ? 'bg-slate-900/50 border-dashed border-slate-700 opacity-75' : 'bg-slate-800/30 border-slate-800/50'}`}>
                    <div className="w-10 h-10 rounded-lg bg-slate-700 shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-400">{comment.author}</span>
                          {comment.visibility === 'private' && (<span className="text-[9px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-bold tracking-widest uppercase">Sadece Sen</span>)}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-600 uppercase mt-1">{comment.date}</span>
                          <button onClick={() => handleToggleVisibility(comment.id)} className="text-slate-500 hover:text-blue-400 transition-colors" title="Gizliliği Değiştir">{comment.visibility === "public" ? "👁️" : "🔒"}</button>
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-slate-500 hover:text-red-500 transition-colors" title="Sil">🗑️</button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 italic mt-1">"{comment.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <input type="text" placeholder="Profiline not bırak..." className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 text-sm outline-none focus:border-blue-500" />
                <button className="bg-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-600">GÖNDER</button>
              </div>
            </section>
          </div>

          {/* SAĞ KOLON (Arkadaşlar, Stats, Analiz, **YENİ BAŞARIMLAR VİTRİNİ**) */}
          <div className="space-y-6">
            
            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-widest text-center">Arkadaşlar</h3>
              <div className="mb-4 flex gap-2">
                 <input type="text" placeholder="Kullanıcı ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                 {filteredFriends.length === 0 ? <p className="text-xs text-slate-500 text-center italic py-2">Kullanıcı bulunamadı.</p> : (
                   filteredFriends.map(friend => (
                     <div key={friend.id} className="flex items-center justify-between bg-slate-800/50 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 ${friend.color} rounded-lg flex items-center justify-center text-xs font-bold shadow-inner`}>{friend.initials}</div>
                           <span className="text-sm font-bold text-slate-300">{friend.name}</span>
                        </div>
                        <button onClick={() => toggleFriendStatus(friend.id)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${friend.isFriend ? 'text-slate-400 bg-slate-700 hover:bg-red-500/20 hover:text-red-400' : 'text-blue-400 bg-blue-500/10 hover:bg-blue-600 hover:text-white'}`}>
                          {friend.isFriend ? 'Çıkar' : 'Ekle'}
                        </button>
                     </div>
                   ))
                 )}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"><p className="text-3xl font-black text-blue-400">12</p><p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Toplam Katılım</p></div>
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"><p className="text-3xl font-black text-green-400">%85</p><p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Katılım Oranı</p></div>
            </div>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 tracking-widest text-center">Kategori Analizi</h3>
              <div className="space-y-4">
                {[{ name: "Yazılım / Eğitim", val: 90, color: "bg-blue-500" }, { name: "Spor / Rekabet", val: 65, color: "bg-red-500" }, { name: "Eğlence / Sosyal", val: 40, color: "bg-yellow-500" }].map((stat, i) => (
                  <div key={i} className="space-y-1"><div className="flex justify-between text-[10px] font-bold uppercase text-slate-400"><span>{stat.name}</span><span>%{stat.val}</span></div><div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div></div></div>
                ))}
              </div>
            </section>

            {/* --- YENİ EKLENEN BAŞARIMLAR VİTRİNİ --- */}
            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Başarımlar Vitrini</h3>
                <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">
                  {unlockedCount} / {achievementsList.length}
                </span>
              </div>
              
              {/* Kaydırılabilir (Scrollable) Rozet Listesi */}
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {achievementsList.map(ach => (
                  <div 
                    key={ach.id} 
                    className={`flex items-start gap-4 p-3 rounded-2xl border transition-all ${
                      ach.unlocked 
                      ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 shadow-md' 
                      : 'bg-slate-900/50 border-slate-800/50 opacity-60 grayscale'
                    }`}
                  >
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${ach.unlocked ? 'bg-slate-700' : 'bg-slate-800'}`}>
                       {ach.icon}
                     </div>
                     <div>
                       <h4 className={`text-sm font-bold flex items-center gap-2 ${ach.unlocked ? 'text-slate-100' : 'text-slate-500'}`}>
                         {ach.title} 
                         {ach.isSecret && (
                           <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded uppercase tracking-widest">Gizli</span>
                         )}
                       </h4>
                       <p className="text-[11px] text-slate-400 leading-tight mt-1.5">{ach.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilim;