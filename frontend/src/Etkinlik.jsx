import React from 'react';

function Etkinlik({ onClose }) {
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    alert("Etkinlik başarıyla oluşturuldu!");
    if (onClose) onClose(); 
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose} 
    >
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500 mb-6">
          YENİ ETKİNLİK BAŞLAT
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Etkinlik Başlığı</label>
            <input 
              type="text" 
              placeholder="Örn: Vize sonrası kahve buluşması" 
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Kategori</label>
                <select className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none shadow-inner">
                    <option className="bg-slate-800 text-white">Ders Çalışma</option>
                    <option className="bg-slate-800 text-white">Spor & Oyun</option>
                    <option className="bg-slate-800 text-white">Kulüp Etkinlikleri</option>
                    <option className="bg-slate-800 text-white">Parti & Eğlence</option>
                </select>
            </div>
            
            <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Kontenjan</label>
                <input 
                  type="text" 
                  placeholder="Sınırsız" 
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
                />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Açıklama</label>
            <textarea 
              rows="4" 
              placeholder="Detayları buraya yaz..." 
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            ></textarea>
          </div>
          
          <div className="flex gap-4 mt-8 pt-4 border-t border-slate-700">
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