# SASTEK İçerik Güncelleme Rehberi

İçerik değişikliklerinden sonra `npm run check` ve `npm run build` komutlarını çalıştırın. Dosya adlarında ve slug alanlarında Türkçe karakter kullanmayın.

## Etkinlik

- `src/data/events.ts` içindeki örneklerden birini kopyalayın.
- Benzersiz `id` ve `slug` belirleyin; TR/EN metinleri doldurun.
- Görseli `public/images/events/` altına koyup `image` alanını güncelleyin.
- `status`, `isFeatured`, tarih, konum ve varsa dış bağlantıyı ayarlayın.

## Anlaşmalı nokta

- Logoyu `public/images/partners/` altına ekleyin.
- `src/data/partners.ts` içinde yeni kayıt oluşturun.
- İndirim/kampanya için `discountLabel` ve `campaignText` alanlarını kullanın.
- `isActive` görünürlüğü, `isFeatured` ana sayfa seçimini, `order` sıralamayı belirler.
- Firma doğrulandıktan sonra `isVerified` değerini `true` yapın.

## Sponsor

- Logoyu `public/images/sponsors/` altına ekleyin.
- `src/data/sponsors.ts` içinde kayıt oluşturun.
- `tier` alanını ana sponsor, altın, gümüş, bronz, destekçi veya partner seviyelerinden biri olarak ayarlayın.
- Görünürlük, öne çıkarma, doğrulama ve sıra alanlarını güncelleyin.

## Galeri

- Optimize edilmiş görseli `public/images/gallery/` altına koyun.
- `src/data/gallery.ts` dosyasına kayıt ekleyin.
- Türkçe ve İngilizce alt metni mutlaka yazın; kategori ve sıra belirleyin.

## Yönetim ve iletişim

- Yönetim kişilerini `src/data/team.ts` üzerinden güncelleyin.
- Genel site bilgilerini `src/data/site.ts` içinde düzenleyin.
- Eski kişi veya e-posta bilgilerini doğrulamadan yayımlamayın.

## Sosyal medya

- `src/data/socials.ts` içindeki URL'leri doğrulanmış adreslerle değiştirin.
- Bağlantının görünmesi için `isActive: true` yapın.
- `order` alanıyla sıralamayı değiştirin.

## Navigasyon ve dil

- Menü bağlantıları `src/data/navigation.ts` dosyasındadır.
- Ortak içerik modellerinde hem `tr` hem `en` alanlarını koruyun.
