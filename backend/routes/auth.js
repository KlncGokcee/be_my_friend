const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// 1. KAYIT OL (REGISTER) API
router.post('/register', async (req, res) => {
    const { tam_isim, kullanici_adi, email, sifre } = req.body;
    const pool = req.app.locals.pool;

    // Email kontrolü
    if (!email.endsWith('@ogr.ktu.edu.tr') && !email.endsWith('@ktu.edu.tr')) {
        return res.status(400).json({ basari: false, mesaj: "Sadece KTÜ maili kabul edilmektedir!" });
    }

    console.log("-----------------------------------------");
    console.log("Yeni bir kayıt isteği geldi!");
    console.log("Kullanıcı Adı:", kullanici_adi);
    console.log("E-posta:", email);

    try {
        const hashedSifre = await bcrypt.hash(sifre, 10);
        
        const yeniKullanici = await pool.query(
            "INSERT INTO kullanicilar (tam_isim, kullanici_adi, email, sifre) VALUES ($1, $2, $3, $4) RETURNING *",
            [tam_isim, kullanici_adi, email, hashedSifre]
        );
        console.log("✅ Veritabanına başarıyla kaydedildi: ID ->", yeniKullanici.rows[0].id);
        res.json({ basari: true, mesaj: "Kayıt başarılı!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ basari: false, mesaj: "Bu kullanıcı adı veya e-posta zaten kullanımda!" });
    }
});

// 2. GİRİŞ YAP (LOGIN) API
router.post('/login', async (req, res) => {
    const { email, sifre } = req.body;

    if (!email || !sifre) {
        return res.status(400).json({ basari: false, mesaj: "Email ve şifre zorunlu!" });
    }

    const pool = req.app.locals.pool;

    try {
        const kullanici = await pool.query(
            "SELECT * FROM kullanicilar WHERE email = $1", 
            [email]
        );

        if (kullanici.rows.length === 0) {
            return res.status(401).json({ basari: false, mesaj: "Böyle bir kullanıcı bulunamadı!" });
        }

        const sifreDogruMu = await bcrypt.compare(sifre, kullanici.rows[0].sifre);
        if (!sifreDogruMu) {
            return res.status(401).json({ basari: false, mesaj: "Şifre hatalı!" });
        }

        res.json({ 
            basari: true, 
            mesaj: "Giriş başarılı! Hoş geldin " + kullanici.rows[0].tam_isim,
            kullanici: {
                id: kullanici.rows[0].id,
                isim: kullanici.rows[0].tam_isim
            }
        });

    } catch (err) {
        console.error("LOGIN HATASI:", err.message);
        res.status(500).json({ basari: false, mesaj: err.message });
    }
});

module.exports = router;