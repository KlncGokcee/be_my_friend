import React, { useState } from 'react';

function Etkinlik({ onClose }) {
  // 1. Veritabanı sütunlarıyla eşleşen State'ler
  const [baslik, setBaslik] = useState("");
  const [kategori, setKategori] = useState("Ders Çalışma");
  const [kontenjan, setKontenjan] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState(""); // SQL'deki bitis_tarihi için zorunlu alan
  const [aciklama, setAciklama] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // 2. Giriş yapmış kullanıcının ID'sini çekiyoruz (olusturan_id için)
    const kullaniciVerisi = localStorage.getItem("kullanici");
    if (!kullaniciVerisi) {
      alert("Etkinlik oluşturmak için önce giriş yapmalısın!");
      return;
    }
    const kullanici = JSON.parse(kullaniciVerisi);

    // 3. Verileri Backend'e gönderiyoruz
    try {
      const response = await fetch("http://localhost:5000/api/etkinlikler/olustur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baslik: baslik,
          kategori: kategori,
          kontenjan: kontenjan === "" ? null : parseInt(kontenjan), // Boş bırakılırsa DB'ye null gitsin
          bitis_tarihi: bitisTarihi,
          aciklama: aciklama,
          olusturan_id: kullanici.id
        })
      });

      const data = await response.json();

      if (data.basari) {
        alert("🎉 Etkinlik başarıyla oluşturuldu!");

        if (onClose) onClose(); // Pencereyi kapat
        // ŞİMDİ SAYFAYI TAZELİYORUZ
        window.location.reload();
      } else {
        alert("❌ Hata: " + data.mesaj);
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      alert("Sunucuya bağlanılamadı. Backend çalışıyor mu?");
    }
  };

  return (
        <div 
      // DEĞİŞEN KISIM BURASI:
      // 'bg-black/80 backdrop-blur-sm' yerine 'bg-slate-950/95' (veya sadece 'bg-slate-950')
      // Bulanıklık (blur) tamamen kaldırıldı, daha koyu ve pürüzsüz bir slate katmanı eklendi.
      className="fixed inset-0 bg-slate-950/95 flex items-center justify-center z-[100] p-4"
      onClick={onClose} 
    >
      <div 
        // Modalın kendi tasarımı aynı kalıyor
        className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500 mb-6 shrink-0">
          YENİ ETKİNLİK BAŞLAT
        </h2>
        
        {/* overflow-y-auto ekledik ki form uzarsa ekrandan taşmasın, scroll çıksın */}
        <form className="space-y-5 overflow-y-auto pr-2 custom-scrollbar" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Etkinlik Başlığı</label>
            <input 
              type="text" 
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              placeholder="Örn: Vize sonrası kahve buluşması" 
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Kategori</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-inner"
                >
                    <option value="Ders Çalışma" className="bg-slate-800 text-white">Ders Çalışma</option>
                    <option value="Spor & Oyun" className="bg-slate-800 text-white">Spor & Oyun</option>
                    <option value="Kulüp Etkinlikleri" className="bg-slate-800 text-white">Kulüp Etkinlikleri</option>
                    <option value="Parti & Eğlence" className="bg-slate-800 text-white">Parti & Eğlence</option>
                </select>
            </div>
            
            <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Kontenjan</label>
                <input 
                  type="number" 
                  value={kontenjan}
                  onChange={(e) => setKontenjan(e.target.value)}
                  placeholder="Sınırsız" 
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
                />
            </div>
          </div>

          {/* YENİ EKLENEN ALAN: Bitiş Tarihi */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Bitiş Tarihi ve Saati</label>
            <input 
              type="datetime-local" 
              value={bitisTarihi}
              onChange={(e) => setBitisTarihi(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner [color-scheme:dark]" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Açıklama</label>
            <textarea 
              rows="3" 
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              placeholder="Detayları buraya yaz..." 
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            ></textarea>
          </div>
          
          <div className="flex gap-4 mt-8 pt-4 border-t border-slate-700 shrink-0">
            <button 
              type="button" 
              onClick={onClose} 
              className="w-1/2 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="w-1/2 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
            >
              Paylaş
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Etkinlik;