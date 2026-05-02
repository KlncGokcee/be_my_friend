require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Neon Veritabanı bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Veritabanı bağlantısını diğer dosyalara da gönderebilmek için
// İleride router dosyalarından bu pool'a erişeceğiz.
app.locals.pool = pool; 

// ----------------------------------------
// API YÖNLENDİRMELERİ (ROUTER BAĞLANTILARI)
// ----------------------------------------
// Dosyaları içeriye çağırıyoruz
const authRoutes = require('./routes/auth');
//const etkinliklerRoutes = require('./routes/etkinlikler');
//const profilRoutes = require('./routes/profil');
//const bildirimlerRoutes = require('./routes/bildirimler');

// Frontend'in istek atacağı URL'leri tanımlıyoruz
app.use('/api/auth', authRoutes);
//app.use('/api/etkinlikler', etkinliklerRoutes);
//app.use('/api/profil', profilRoutes);
//app.use('/api/bildirimler', bildirimlerRoutes);
// ----------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor... `);
});