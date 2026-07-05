# SASTEK Kurumsal Web Sitesi

Eskişehir Teknik Üniversitesi Savunma Sanayii ve Teknolojileri Kulübü ana tanıtım sitesi. Proje Astro, Tailwind CSS ve TypeScript ile tamamen statik üretilir.

## Yerel kurulum

Node.js LTS ve npm gereklidir.

```sh
npm install
npm run dev
```

Yerel geliştirme adresi terminalde gösterilir.

## Komutlar

- `npm run dev`: geliştirme sunucusu
- `npm run check`: Astro ve TypeScript kontrolü
- `npm run build`: üretim çıktısını `dist/` klasörüne oluşturur
- `npm run preview`: üretim çıktısını yerelde önizler

## İçerik yönetimi

Etkinlikler, anlaşmalı noktalar, sponsorlar, galeri, ekip, sosyal medya ve navigasyon `src/data/` altındaki dosyalardan yönetilir. Ayrıntılar için `CONTENT_GUIDE.md` dosyasına bakın.

Arşivden gelen anlaşmalı nokta ve sponsor kayıtları doğrulanmış kabul edilmez. Yayın öncesinde kulüp tarafından güncellenmelidir.

## Cloudflare Pages

1. GitHub deposunu Cloudflare Pages projesine bağlayın.
2. Framework preset olarak Astro seçin.
3. Build komutunu `npm run build`, çıktı dizinini `dist` olarak ayarlayın.
4. Preview ve production deploy'ları ayrı branch akışlarıyla kullanın.
5. Üretim doğrulandıktan sonra yalnızca ana domaini Cloudflare Pages'e bağlayın.

`etkinlik.sastek.org`, `yoklama.sastek.org`, `belge.sastek.org`, `qr.sastek.org`, `form.sastek.org`, `mail.sastek.org` ve `kayit.sastek.org` gibi mevcut operasyonel sistemlerin DNS kayıtlarına veya hosting dosyalarına dokunulmamalıdır.

Bu proje PHP, MySQL, cPanel, FTP, admin paneli veya gizli anahtar gerektirmez. DNS geçişi kod kapsamının dışındadır.
