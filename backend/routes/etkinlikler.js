const express = require('express');
const router = express.Router();

// 1. YENİ ETKİNLİK OLUŞTURMA ROTASI (POST)
router.post('/olustur', async (req, res) => {
    // Frontend'den gelen verileri alıyoruz
    const { baslik, kategori, kontenjan, bitis_tarihi, aciklama, olusturan_id } = req.body;
    const pool = req.app.locals.pool;

    try {
        // Veritabanına yazma işlemi (INSERT)
        const yeniEtkinlik = await pool.query(
            "INSERT INTO etkinlikler (baslik, kategori, kontenjan, bitis_tarihi, aciklama, olusturan_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [baslik, kategori, kontenjan, bitis_tarihi, aciklama, olusturan_id]
        );
        
        // İşlem başarılıysa frontend'e haber ver
        res.json({ basari: true, mesaj: "Etkinlik başarıyla eklendi!", veri: yeniEtkinlik.rows[0] });
    } catch (err) {
        console.error("Etkinlik ekleme hatası:", err.message);
        res.status(500).json({ basari: false, mesaj: "Sunucu hatası: Etkinlik oluşturulamadı." });
    }
});

// 2. TÜM AKTİF ETKİNLİKLERİ GETİRME ROTASI (GET)
router.get('/hepsi', async (req, res) => {
    const pool = req.app.locals.pool;
    
    try {
        // NOW() fonksiyonu sayesinde sadece süresi BİTMEMİŞ etkinlikleri çekeriz
        // ORDER BY ile de en yeni oluşturulanı en üstte gösteririz
        const sonuc = await pool.query("SELECT * FROM etkinlikler WHERE bitis_tarihi > NOW() ORDER BY olusturulma_tarihi DESC");
        
        res.json({ basari: true, veriler: sonuc.rows });
    } catch (err) {
        console.error("Etkinlik getirme hatası:", err.message);
        res.status(500).json({ basari: false, mesaj: "Etkinlikler veritabanından çekilemedi." });
    }
});

module.exports = router;