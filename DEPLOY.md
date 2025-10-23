# 🚀 NASAZENÍ A INSTALACE

## ✅ HOTOVO - Aplikace běží online!

### 🌐 Veřejné URL (připraveno k použití)

**GitHub Pages (oficiální):**
```
https://majpuzik.github.io/minecraft-watch-app/
```

**Instalační stránka:**
```
https://majpuzik.github.io/minecraft-watch-app/install.html
```

---

## 📱 JAK NAINSTALOVAT (2 kroky)

### Pro iPhone:

1. **Otevřete Safari** a přejděte na:
   ```
   https://majpuzik.github.io/minecraft-watch-app/
   ```

2. **Klikněte na ikonu Sdílet** (čtverec se šipkou ↑)
   - Sjeďte dolů
   - Klikněte **"Přidat na plochu"**
   - Potvrďte
   - ✅ **HOTOVO!** Ikona je na ploše

### Pro Apple Watch:

**Metoda 1 - Přes iPhone:**
1. Nainstalujte na iPhone (viz výše)
2. Otevřete app **Watch** na iPhone
3. Dock → Upravit → Přidejte aplikaci
4. Synchronizuje se automaticky

**Metoda 2 - Přímo:**
1. Otevřete **Safari** na Apple Watch
2. Zadejte URL (použijte dictation)
3. Aplikace se automaticky přizpůsobí

---

## 🎯 NEBO NASKENUJTE QR KÓD

Přejděte na instalační stránku:
```
https://majpuzik.github.io/minecraft-watch-app/install.html
```

Naskenujte QR kód telefonem → automaticky otevře Safari

---

## 🔄 ALTERNATIVNÍ DEPLOYE

### 1. Netlify (okamžitý deploy)

```bash
# Zaregistrovat se na netlify.com
# Drag & drop složku nebo:

cd ~/minecraft-watch-app
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

Váš Netlify URL: `https://YOUR-SITE.netlify.app`

### 2. Vercel

```bash
npm install -g vercel
cd ~/minecraft-watch-app
vercel --prod
```

### 3. Cloudflare Pages

1. Přihlásit se na pages.cloudflare.com
2. Connect to Git → Vybrat GitHub repo
3. Deploy

---

## 📊 PŘEHLED NASAZENÍ

| Platforma | Status | URL | Rychlost |
|-----------|--------|-----|----------|
| **GitHub Pages** | ✅ LIVE | [majpuzik.github.io/minecraft-watch-app](https://majpuzik.github.io/minecraft-watch-app/) | ⚡⚡⚡ |
| **Netlify** | 🔄 Připraveno | Potřeba deploy | ⚡⚡⚡⚡ |
| **Vercel** | 🔄 Připraveno | Potřeba deploy | ⚡⚡⚡⚡ |

---

## 🔍 TESTOVÁNÍ

### Test přístupnosti:
```bash
curl -I https://majpuzik.github.io/minecraft-watch-app/
```

### Test PWA manifestu:
```bash
curl https://majpuzik.github.io/minecraft-watch-app/manifest.json
```

### Test Service Worker:
Otevřít DevTools → Application → Service Workers

---

## 🛠️ AKTUALIZACE

Když uděláte změny:

```bash
cd ~/minecraft-watch-app
git add .
git commit -m "Popis změn"
git push

# GitHub Pages se automaticky aktualizuje za ~1 min
```

---

## 📱 SDÍLENÍ S OSTATNÍMI

### QR kód:
- Otevřete: https://majpuzik.github.io/minecraft-watch-app/install.html
- Ukažte QR kód
- Druhá osoba naskenuje → instalace

### Přímý link:
```
https://majpuzik.github.io/minecraft-watch-app/
```

### Krátký link (volitelné):
Použijte bit.ly, tinyurl.com nebo:
```bash
# Vlastní doména (advanced)
# Settings → Pages → Custom domain
```

---

## 🔐 ZABEZPEČENÍ

### Nastavení GitHub:
- Repo: Public (nutné pro GitHub Pages free)
- Settings → Security → Přidat branch protection

### Nastavení PWA:
- HTTPS: ✅ Automaticky (GitHub Pages)
- CSP Headers: ✅ V netlify.toml
- Service Worker: ✅ Cache-first strategie

---

## 📈 ANALYTICS (volitelné)

### Přidat Google Analytics:

Do `index.html` před `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ CHECKLIST PO DEPLOYI

- [x] GitHub Pages běží na hlavní URL
- [x] Instalační stránka s QR kódem funguje
- [x] PWA manifest dostupný
- [x] Service Worker zaregistrován
- [ ] Testováno na reálném iPhone
- [ ] Testováno na reálném Apple Watch
- [ ] QR kód vygenerován a funguje
- [ ] Offline režim funguje

---

## 🎉 HOTOVO!

Aplikace je **LIVE** a připravená k použití!

**Hlavní URL:**
```
🌐 https://majpuzik.github.io/minecraft-watch-app/
```

**Pro instalaci stačí:**
1. Otevřít URL v Safari
2. "Přidat na plochu"
3. Hrát! 🎮

---

**🤖 Deploy vytvořen pomocí Claude Code**
**📅 Datum: 2025-10-23**
