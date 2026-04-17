import React from 'react';

function LoginPage() {
  
  // Form gönderildiğinde sayfanın yenilenmesini engelleyen fonksiyon
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Giriş yapılıyor...");
    // İleride buraya e-posta ve şifreyi kontrol edecek backend kodları eklenecek
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Arka plan renk efektleri */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>

      {/* Ana Form Kartı */}
      <div className="relative z-10 bg-gray-900/40 border border-gray-800 w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-md">
        
        {/* Başlık */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
            TEKRAR HOŞ GELDİN
          </h1>
          <p className="text-gray-400 mt-2 text-sm italic">Mücadeleye kaldığın yerden devam et.</p>
        </div>

        {/* Giriş Formu */}
        <form className="space-y-6" onSubmit={handleLogin}>
          
          {/* E-posta Alanı */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-blue-400 transition-colors">
              E-posta
            </label>
            <input 
              type="email" 
              placeholder="kullanici@mail.com" 
              className="w-full bg-gray-800/40 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 text-lg"
            />
          </div>

          {/* Şifre Alanı */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-red-400 transition-colors">
              Şifre
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-gray-800/40 border border-gray-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600 text-lg"
            />
          </div>

          {/* Giriş Butonu */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-black py-4 rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-95 text-lg uppercase tracking-widest"
          >
            Giriş Yap
          </button>
        </form>

        {/* Alt Bağlantılar */}
        <div className="mt-10 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            Henüz bir hesabın yok mu?{' '}
            <a href="/register" className="text-white font-bold hover:text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors">
              Ücretsiz Katıl
            </a>
          </p>
          <a href="/" className="inline-block mt-4 text-gray-600 hover:text-gray-400 text-xs transition-colors">
            ← Ana Sayfaya Dön
          </a>
        </div>
        
      </div>

    </div>
  );
}

export default LoginPage;