import React from 'react';

function RegisterPage() {
  
  // Form gönderildiğinde sayfanın yenilenmesini engelleyen fonksiyon
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Yeni hesap oluşturuluyor...");
    // İleride buraya kayıt verilerini (isim, e-posta, şifre) veritabanına gönderecek kodlar eklenecek
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex items-center justify-center p-4">

      {/* Kayıt Formu Kartı */}
      <div className="bg-gray-900/50 border border-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
            YENİ HESAP OLUŞTUR
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Maceraya katılmak için bilgileri doldur.</p>
        </div>

        {/* Kayıt Formu */}
        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Ad Soyad Alanı */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Ad Soyad</label>
            <input 
              type="text" 
              placeholder="Ahmet Yılmaz" 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Kullanıcı Adı Alanı */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Kullanıcı Adı</label>
            <input 
              type="text" 
              placeholder="ahmet123" 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* E-posta Alanı */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">E-posta</label>
            <input 
              type="email" 
              placeholder="ahmet@mail.com" 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Şifre Alanı */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Kayıt Butonu */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 mt-4"
          >
            Hesap Oluştur
          </button>
        </form>

        {/* Alt Bağlantı (Giriş Yap) */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm">
          <span className="text-gray-500">Zaten bir hesabın var mı?</span>
          <a href="/login" className="ml-1 text-blue-400 font-bold hover:text-red-500 transition-colors">
            Giriş Yap
          </a>
        </div>
        
      </div>

    </div>
  );
}

export default RegisterPage;