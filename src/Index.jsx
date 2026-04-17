import React from 'react';
import { Link } from 'react-router-dom'; // Link bileşenini kullanacağız

function WelcomePage() {
  return (
    <div className="bg-[#0f172a] text-white font-sans overflow-hidden min-h-screen relative">
      
      {/* Özel CSS Animasyonu */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .floating { animation: float 3s ease-in-out infinite; }
        `}
      </style>

      {/* Arka Plan Efektleri */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 rounded-full blur-[120px]"></div>

      {/* Ana İçerik */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-12 floating">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
            Be <span className="text-white text-4xl md:text-6xl block md:inline">My</span> FRIEND
          </h1>
          <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
            Her türlü etkinliğe dair bilgilere ulaşabileceğin üniversite platformu.
          </p>
        </div>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          {/* href yerine 'to' kullanıyoruz, <a> yerine <Link> */}
          <Link 
            to="/register" 
            className="flex-1 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg shadow-white/5 text-center"
          >
            Hemen Kayıt Ol
          </Link>

          <Link 
            to="/login" 
            className="flex-1 border-2 border-gray-700 py-4 rounded-xl font-bold text-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 text-center"
          >
            Giriş Yap
          </Link>
        </div>

        {/* Footer */}
        <p className="absolute bottom-8 text-gray-600 text-sm italic">
          &copy; 2026 Be My Friend Project - Engineering Team
        </p>

      </div>
    </div>
  );
}

export default WelcomePage;