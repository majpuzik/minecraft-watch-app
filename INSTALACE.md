# 📲 Instalační průvodce - Minecraft Hodinky

## Rychlý start (3 kroky)

### 1️⃣ Spustit server

```bash
cd ~/minecraft-watch-app
./start.sh
```

Server poběží na: **http://localhost:8080**

### 2️⃣ Otevřít na iPhone

1. Otevřete **Safari** na iPhone
2. Zadejte adresu: `http://YOUR-MAC-IP:8080`
   - IP adresu najdete ve výstupu z `./start.sh`
3. Aplikace se načte

### 3️⃣ Přidat na plochu (PWA instalace)

1. V Safari klikněte na ikonu **Sdílet** (čtverec se šipkou ↑)
2. Sjeďte dolů a klikněte **"Přidat na plochu"**
3. Potvrďte název **"Minecraft Hodinky"**
4. Klikněte **"Přidat"**

✅ Hotovo! Ikona se objeví na ploše iPhone.

---

## ⌚ Instalace na Apple Watch

### Metoda 1: Přes iPhone Dock (doporučeno)

1. Nejprve nainstalujte na iPhone (viz výše)
2. Otevřete aplikaci **Watch** na iPhone
3. Přejděte na záložku **"Moje hodinky"**
4. Vyberte **"Dock"**
5. Klikněte **"Upravit"**
6. Najděte **"Minecraft Hodinky"** a přidejte
7. Aplikace se synchronizuje na Apple Watch

### Metoda 2: Přímý přístup přes Safari

1. Otevřete **Safari** přímo na Apple Watch
   - Podržte Digital Crown → vyberte Safari
2. Zadejte adresu serveru (použijte dictation)
3. Aplikace se načte a automaticky přizpůsobí

> **Poznámka:** Apple Watch nemá nativní "Přidat na plochu", ale můžete:
> - Přidat do oblíbených Safari
> - Použít Siri Shortcuts pro rychlý přístup
> - Nainstalovat přes WatchKit companion (vyžaduje Xcode)

---

## 🌐 Přístup přes internet (volitelné)

### Pomocí Tailscale (už máte)

```bash
# Zjistit Tailscale IP
tailscale ip -4

# Server bude dostupný na:
# http://YOUR-TAILSCALE-IP:8080
```

### Pomocí ngrok

```bash
# Nainstalovat ngrok
brew install ngrok

# Spustit tunel
ngrok http 8080

# Získáte URL typu:
# https://abc123.ngrok.io
```

---

## 🔧 Řešení problémů

### Server se nespustí

```bash
# Zkontrolovat port
lsof -i :8080

# Zkusit jiný port
python3 -m http.server 8081
```

### iPhone se nemůže připojit

1. **Zkontrolovat firewall:**
   ```bash
   # macOS firewall - povolit Python
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/bin/python3
   ```

2. **Zkontrolovat síť:**
   - iPhone i Mac musí být na stejné WiFi
   - Vypněte VPN na obou zařízeních

3. **Zkusit IP adresu místo localhost:**
   ```bash
   # Zjistit IP Mac
   ipconfig getifaddr en0
   ```

### Aplikace nefunguje offline

1. **Otevřít DevTools v Safari:**
   - iPhone → Nastavení → Safari → Pokročilé → Web Inspector
   - Mac → Safari → Vývoj → [iPhone] → [Minecraft Hodinky]

2. **Zkontrolovat Service Worker:**
   - Application → Service Workers
   - Měl by být "activated and running"

3. **Vymazat cache:**
   - iPhone → Nastavení → Safari → Vymazat historii

### Ikony se nezobrazují

```bash
# Znovu vygenerovat ikony
cd ~/minecraft-watch-app
./create-icons-simple.sh

# Zkontrolovat
ls -lh icons/
```

---

## 📱 Testování na simulátoru

### iOS Simulator (Xcode required)

```bash
# Spustit simulátor
open -a Simulator

# V simulátoru otevřít Safari
# Přejít na: http://localhost:8080
```

### watchOS Simulator

```bash
# Xcode → Open Developer Tool → Simulator
# File → Open Simulator → Apple Watch Series 10

# Safari není dostupný na watchOS simulátoru
# Použijte fyzické hodinky pro testování
```

---

## 🚀 Pokročilé: Nasazení na hosting

### GitHub Pages

```bash
cd ~/minecraft-watch-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/minecraft-watch.git
git push -u origin main

# V GitHub → Settings → Pages
# Source: main branch
# URL: https://USERNAME.github.io/minecraft-watch/
```

### Netlify

```bash
# Drag & drop složku na: https://app.netlify.com/drop
# Nebo použít CLI:
npm install -g netlify-cli
netlify deploy --prod
```

---

## ✅ Checklist po instalaci

- [ ] Server běží na lokálním portu
- [ ] Aplikace se načte na iPhone přes Safari
- [ ] PWA ikona přidána na plochu iPhone
- [ ] Aplikace funguje offline po instalaci
- [ ] Zvuky a vibrace fungují
- [ ] Hra je ovladatelná touch gesty
- [ ] Hodiny ukazují správný čas
- [ ] Skóre se ukládá mezi restarty

---

## 📞 Podpora

Máte problém? Zkontrolujte:

1. **README.md** - kompletní dokumentace
2. **Console v Safari** - chybové hlášky
3. **DevTools → Network** - načítání souborů
4. **DevTools → Application** - Service Worker status

---

**Enjoy the game! 🎮⛏️**
