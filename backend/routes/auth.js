const express = require('express');
const router = express.Router();

// 1. KAYIT OL (REGISTER) API
router.post('/register', async (req, res) => {
    const { tam_isim, kullanici_adi, email, sifre } = req.body; // Frontend'den gelen 4 veri
    const pool = req.app.locals.pool;
    // 1. İsteğin ulaştığını terminalde görelim
    console.log("-----------------------------------------");
    console.log("Yeni bir kayıt isteği geldi!");
    console.log("Kullanıcı Adı:", kullanici_adi);
    console.log("E-posta:", email);

    try {
        const yeniKullanici = await pool.query(
            "INSERT INTO kullanicilar (tam_isim, kullanici_adi, email, sifre) VALUES ($1, $2, $3, $4) RETURNING *",
            [tam_isim, kullanici_adi, email, sifre]
        );
        // 2. Veritabanı işleminin başarılı olduğunu loglayalım
        console.log("✅ Veritabanına başarıyla kaydedildi: ID ->", yeniKullanici.rows[0].id);
        
        res.json({ basari: true, mesaj: "Kayıt başarılı!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ basari: false, mesaj: "Bu kullanıcı adı veya e-posta zaten kullanımda!" });
    }
});
// 2. GİRİŞ YAP (LOGIN) API
router.post('/login', async (req, res) => {
    const { kullanici_adi, sifre } = req.body;
    const pool = req.app.locals.pool;

    try {
        // Veritabanında bu kullanıcı adı ve şifreyle eşleşen biri var mı diye soruyoruz
        const kullanici = await pool.query(
            "SELECT * FROM kullanicilar WHERE kullanici_adi = $1 AND sifre = $2",
            [kullanici_adi, sifre]
        );

        if (kullanici.rows.length === 0) {
            return res.status(401).json({ basari: false, mesaj: "Hatalı kullanıcı adı veya şifre!" });
        }

        res.json({ basari: true, mesaj: "Giriş başarılı! Sisteme hoş geldin." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ basari: false, mesaj: "Sunucu hatası" });
    }
});

module.exports = router;