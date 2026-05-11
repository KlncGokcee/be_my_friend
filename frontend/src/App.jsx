import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Senin dosya isimlerinle birebir eşleşen importlar:
import Index from './Index';      // Karşılama ekranın
import Login from './Login';      // Giriş ekranın
import Register from './Register';// Kayıt ekranın
import Mainpage from './Mainpage';// Panel/Kampüs ekranın
import Etkinlik from './Etkinlik';// Modal (Açılır pencere)
import Profilim from './Profilim';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* PANEL SAYFASI */}
        <Route path="/panel" element={
          <Mainpage onOpenModal={() => setIsModalOpen(true)} />
        } />

        {/* BURAYI EKLE: Etkinlik'i bağımsız bir sayfa olarak da tanımlıyoruz */}
        <Route path="/etkinlik" element={<Etkinlik isOpen={true} onClose={() => window.history.back()} />} />
        <Route path="/profil" element={<Profilim />} />
      </Routes>

      {/* Modal'ı burada tanımlıyoruz, böylece her sayfada erişilebilir olur */}{/* Eğer isModalOpen TRUE ise Etkinlik bileşenini ekrana çiz, FALSE ise yok et */}
      {isModalOpen && (
        <Etkinlik onClose={() => setIsModalOpen(false)} />
      )}
    </BrowserRouter>
  );
}
export default App;