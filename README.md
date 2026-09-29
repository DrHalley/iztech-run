# IZTECH RUN

İYTE Yazılım için Python temalı, sessiz bir kampüs koşusu. HTML, CSS ve Canvas 2D ile çalışır; kurulum veya derleme bağımlılığı yoktur.

## Çalıştırma

`dist/index.html` dosyasını tarayıcıda açabilirsiniz. Yerel sunucu tercih ederseniz proje klasöründe:

```sh
python -m http.server 8000 --directory dist
```

Ardından http://localhost:8000 adresini açın. Oyun Python ile yazılmamıştır; Python, oyunun temasıdır ve yukarıdaki komut yalnızca isteğe bağlı dosya sunucusudur.

## Oynanış

- Başlangıçta kız veya erkek öğrenci seçilir; ikisinin fizik ve çarpışma kuralları aynıdır.
- Space / ↑: zıpla. ↓ / S: eğil. F: ateş et. Esc: duraklat. Mobilde ekran düğmeleri bulunur.
- Öğrenci 3 can ve 10 şarj ile başlar. Atış 1 şarj harcar; powerbank 2 şarj yeniler (üst sınır 10).
- Kahve 1 can yeniler (üst sınır 3). Yerdeki kahvenin üzerinden zıplanırsa toplanmaz.
- Yalnızca bug'lar vurulabilir. Her 2.500 puanda gece/gündüz değişir: 0–2499 gündüz, 2500–4999 gece, 5000–7499 gündüz. Gündüz sınavlar, gece domuzlar ve eğilerek geçilen sinekler çıkar. Bug'lar her iki evrede de bulunur.
- Mermi küçük bir `"damage"` yazısıdır; terminal `print("damage")` gösterir.
- Dil TR/EN düğmeleriyle değişir. Dil, karakter tercihi ve rekor bu tarayıcıda saklanır.
- Gece sokak lambaları yolu aydınlatır; camlı bekleme alanı ve kırmızı bank seyrek aralıklarla görünür. Kız öğrenci sarı saçlı ve beyaz-bordo IZTECH sweatshirtlü, erkek öğrenci kısa saçlı ve koyu gri sweatshirtlüdür.
- Ses yoktur. Ortak leaderboard veya veritabanı henüz yoktur.

## Kaynak yapısı

- `dist/index.html`: arayüz
- `dist/style.css`: görünüm ve mobil düzen
- `dist/game.js`: fizik, girişler, çarpışmalar, batarya ve kahve
- `dist/art.js`: karakterler, Teknopark, nesneler
- `dist/campus.js`: bölüm binaları, kütüphane, yurtlar, direk, yol ve trafik levhası
- `dist/festival.js`: şenlik, konser, öğrenci grupları ve köpekler
- `tests/art.test.cjs`: çizimler, gece ışıkları ve mekân sırası kontrolleri
- `COURSE_SOURCES.md`: ders kodlarının resmî kaynakları
- `dist/i18n.js`: Türkçe / İngilizce metinler
- `tests/game.test.cjs`: oyun kuralları için Node testleri

```sh
node --test tests/*.test.cjs
```

## Özel GitHub reposuna yükleme

Kaynak ZIP'ini ayrı bir klasöre çıkartın. GitHub'da yeni repo oluşturun: örneğin `iyte-bug-run`, görünürlük **Private**. Repo oluştururken README, .gitignore veya lisans eklemeyin; yerel dosyalar zaten hazırlanmıştır.

Çıkartılan klasörde terminal açın:

```sh
git init
git add .
git commit -m "Add IYTE Bug Run"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/iyte-bug-run.git
git push -u origin main
```

`KULLANICI_ADIN` yerine GitHub kullanıcı adınızı yazın. GitHub girişini Git Credential Manager veya GitHub CLI ile tamamlayın; parolanızı ya da tokeninizi proje dosyalarına koymayın.

Alternatif olarak GitHub Desktop'ta klasörü ekleyin, **Publish repository** seçin ve **Keep this code private** seçeneğini işaretli bırakın.

Resmi rehber: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

## İYTE Yazılım sitesine taşıma

`dist/` içeriği herhangi bir statik web sunucusundan veya sitenin bir alt dizininden sunulabilir. Göreli dosya yolları kullanılır. Yazı tipleri Google Fonts'tan gelir; bağlantı yoksa sistem yazı tiplerine düşer.

Koşu tamamlanınca `iyte:run-complete` olayı skor, bug, kahve, mesafe ve süre bilgisini taşır. Bu olay gelecekte leaderboard entegrasyonu için bir bağlantı noktasıdır. Rekabetçi leaderboard eklenirken istemcinin gönderdiği skora tek başına güvenilmemeli; sunucuda oturum ve skor doğrulaması tasarlanmalıdır.

## Görsel referanslar

Piksel çizimler kullanıcının sağladığı sweatshirt ve kampüs fotoğraflarından yorumlanmıştır; fotoğraflar pakete dahil değildir. Görünmeyen bina kısımları stilize olarak tamamlanmıştır, mimari ölçüm veya birebir harita değildir. Teknoparkın yeşil çatılı cam cephesi; bilgisayar, elektronik-haberleşme, makine, kütüphane, yurt, matematik, moleküler biyoloji ve genetik, fizik, kimya mühendisliği ve mimarlık siluetleri ayrı çizilir.

Kampüs bağlamı için İYTE'nin kampüs sayfası ve RoboLeague 2024 rehberi incelenmiştir:
- https://iyte.edu.tr/hakkinda/kampus-haritasi/
- https://irl.iyte.edu.tr/wp-content/uploads/sites/242/2024/12/HAYATTA-KALMA-REHBER%C4%B0_2024.pdf

made by Arda KARAHALİLOĞLU

## Ek ücret olmadan leaderboard

API, tek başına ücretli bir ürün demek değildir. Tarayıcı ile veritabanı arasındaki kendi sunucu uç noktalarımız da bir API'dir. Mevcut topluluk sunucusu Python/Node ve kalıcı disk destekliyorsa SQLite ve küçük bir HTTP API ile ek veritabanı aboneliği olmadan kurulabilir. Sunucu kaynakları ve yedeklemesi yine gerekir; yalnızca statik dosya sunan GitHub Pages üzerinde SQLite API çalışmaz.

Sunucu yoksa Supabase Free veya Cloudflare Workers Free + D1 Free değerlendirilebilir. Ücretsiz planlar sınırsız değildir; kota, duraklama ve kesinti sınırları vardır. Ücretli plana geçiş veya kullandıkça ödeme bu projenin bütçe tercihine dahil değildir. Hiçbir veritabanı servisi açılmadı ve ödeme planı etkinleştirilmedi.

- SQLite: https://www.sqlite.org/about.html
- Supabase Free maliyet politikası: https://supabase.com/docs/guides/platform/cost-control
- Cloudflare D1 Free limit davranışı: https://developers.cloudflare.com/d1/platform/pricing/

Şenlik alanı gündüz sucuk sırası, gece hareketli konser içerir. Gündüz pop-up quizlerin altından eğilerek geçin. Kampüs öğrencileri ve köpekler yalnızca dekoratif animasyonlardır.

Gece ışıkları her gece yeniden dağıtılır ve gece boyunca sabit kalır. Ders etiketlerinin resmî kaynakları COURSE_SOURCES.md dosyasındadır. Şenlik sırası kesintisiz bir rotada yürür.

## Son sürüm davranışları

- Gece/gündüz aydınlığı yaklaşık 10 saniyede geçiş yapar. Ekrandaki şenlik, alana girildiğindeki konser/stant görünümünü çıkana kadar korur.
- Mekânlar arasında boşluk vardır; aynı mekândan önce en az üç farklı mekân gösterilir.
- Her 5.000 skorda hedef hız artar.
- 2, 3 ve 4 kişilik NPC gruplarında tüm kız–erkek dizilimleri bulunur.
- Mobil düğmelerde basılı tutma korunur; metin seçimi ve uzun basma menüsü engellenir. Gerçek iPhone/Safari doğrulaması ayrıca yapılmalıdır.

## Vercel

Repo kökünde vercel.json hazırdır: framework Other, çıktı dist, build ve install komutu boş. GitHub reposunu Vercel üzerinden içe aktarın; Root Directory repo kökü olsun.

SQLite dosyası Vercel Functions üzerinde kalıcı ortak depolama sağlamaz. SQLite backend için kalıcı diskli ayrı bir sunucu ve kendi HTTP API gerekir. Mevcut oyun henüz çevrimiçi leaderboard içermez.

.openai mevcut Sites yayınının yönetim ayarlarıdır; Vercel için gerekmez. Kaynak ZIP .openai, .git, .env veya yerel veritabanı içermez. Gizli değerleri dist içine koymayın; yayımlanan JavaScript ziyaretçilere açıktır.

Resmi kaynak: https://vercel.com/kb/guide/is-sqlite-supported-in-vercel

## IZTECH RUN arayüz güncellemesi
Topluluk logosu, kalıcı açık/koyu tema, animasyonlu karakter seçimi ve yerel rekor sonuç ekranı eklendi. Oyun yalnızca tarayıcıda çalışır; backend planı iptal edildi. Vercel için repo kökünü kullanın; vercel.json dist klasörünü sunar.
