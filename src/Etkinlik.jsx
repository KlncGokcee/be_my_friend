import React from 'react';

// isOpen: Modalın açık olup olmadığını kontrol eder (true/false)
// onClose: İptal butonuna basıldığında modalı kapatacak fonksiyondur
function EventModal({ isOpen, onClose }) {
  
  // Eğer isOpen 'false' ise, ekrana hiçbir şey çizme (Modal kapalı kalır)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl">
        
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
          YENİ ETKİNLİK BAŞLAT
        </h2>
        
        {/* onSubmit={(e) => e.preventDefault()} : Form gönderildiğinde sayfanın yenilenmesini engeller */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Etkinlik Başlığı */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-bold">Etkinlik Başlığı</label>
            <input 
              type="text" 
              placeholder="Örn: Vize sonrası kahve buluşması" 
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 outline-none focus:border-blue-500" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Kategori */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-bold">Kategori</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 outline-none">
                <option>Ders Çalışma</option>
                <option>Spor & Oyun</option>
                <option>Eğlence / Parti</option>
                <option>Kulüp Resmi</option>
              </select>
            </div>
            
            {/* Kontenjan */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-bold">Kontenjan</label>
              <input 
                type="number" 
                placeholder="Sınırsız" 
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 outline-none" 
              />
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-bold">Açıklama</label>
            <textarea 
              rows="3" 
              placeholder="Detayları buraya yaz..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 mt-6">
            <button 
              type="button" 
              onClick={onClose} // Tıklandığında ana bileşenden gelen kapatma fonksiyonunu çalıştırır
              className="flex-1 bg-gray-800 py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors"
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Paylaş
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default EventModal;