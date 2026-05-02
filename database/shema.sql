-- Eğer eski deneme tablon varsa önce onu silelim
DROP TABLE IF EXISTS kullanicilar;

-- Gerçek tabloyu oluşturalım
CREATE TABLE kullanicilar (
    id SERIAL PRIMARY KEY,
    tam_isim VARCHAR(100) NOT NULL,
    kullanici_adi VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    sifre VARCHAR(255) NOT NULL,
    kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);