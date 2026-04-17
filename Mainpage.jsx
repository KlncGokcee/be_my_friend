import React from 'react';

// onOpenModal: Ana sayfadan gönderilecek ve "Etkinlik Oluştur" butonuna tıklanınca modalı açacak fonksiyon
function PanelPage({ onOpenModal }) {
  return (
    // body etiketindeki class'ları en dıştaki div'e ekliyoruz
    <div className="bg-[#0f172a] text-white min-h-screen">
      
      {/* Üst Gezinme Çubuğu (Navbar) */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
            CoF CAMPUS
          </h1>
          <div className="flex gap-4 items-center">
            {/* HTML'deki onclick yerine React'ın onClick event'ini kullanıyoruz */}
            <button 
              onClick={onOpenModal} 
              className="bg-gradient-to-r from-blue-600 to-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
            >
              + Etkinlik Oluştur
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600"></div>
          </div>
        </div>
      </nav>

      {/* Ana İçerik Alanı */}
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-6">
        
        {/* Sol Menü - Kategoriler */}
        <aside className="w-full md:w-1/4 space-y-4">
          <div className="bg-gray-900/50 p-5 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-4 text-gray-400 uppercase text-xs tracking-widest">Kategoriler</h3>
            <ul className="space-y-2">
              <li><button className="w-full text-left p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 font-medium"># Hepsi</button></li>
              <li><button className="w-full text-left p-2 rounded-lg hover:bg-gray-800 text-gray-400"># Kulüp Etkinlikleri</button></li>
              <li><button className="w-full text-left p-2 rounded-lg hover:bg-gray-800 text-gray-400"># Ders Çalışma</button></li>
              <li><button className="w-full text-left p-2 rounded-lg hover:bg-gray-800 text-gray-400"># Spor & Oyun</button></li>
              <li><button className="w-full text-left p-2 rounded-lg hover:bg-gray-800 text-gray-400"># Parti & Eğlence</button></li>
            </ul>
          </div>
        </aside>

        {/* Orta Alan - Etkinlik Akışı */}
        <section className="w-full md:w-2/4 space-y-6">
          
          {/* Etkinlik Kartı 1 */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Yazılım Kulübü</span>
                <span className="text-gray-500 text-xs">2 saat önce</span>
              </div>
              <h2 className="text-xl font-bold mb-2">Python ile Veri Bilimi Atölyesi</h2>
              <p className="text-gray-400 text-sm mb-4">Lab-3'te toplanıp temel kütüphanelere göz atacağız. Laptopunu kap gel!</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-900"></div>
                  <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-900"></div>
                  <div className="text-xs text-gray-500 self-center ml-4">+12 Katılımcı</div>
                </div>
                <button className="bg-gray-800 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Katıl</button>
              </div>
            </div>
          </div>

          {/* Etkinlik Kartı 2 */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500/50 transition-colors">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Spor</span>
                <span className="text-gray-500 text-xs">10 dk önce</span>
              </div>
              <h2 className="text-xl font-bold mb-2">Halı Saha Maçı - Acil Adam Lazım!</h2>
              <p className="text-gray-400 text-sm mb-4">Kampüs sahasında akşam 8 maçı için 2 kişi eksik. Defans oynayabilen varsa harika olur.</p>
              <button className="w-full bg-red-600/20 border border-red-600/50 text-red-400 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all">İletişime Geç</button>
            </div>
          </div>

        </section>

        {/* Sağ Menü - İpuçları */}
        <aside className="hidden md:block w-1/4 space-y-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-red-900/20 p-5 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-3 text-sm">Günün İpucu 💡</h3>
            <p className="text-xs text-gray-400 italic">"Yeni projeler için 'Proje Partneri' kategorisini filtrelemeyi unutma!"</p>
          </div>
        </aside>

      </main>
    </div>
  );
}

export default PanelPage;