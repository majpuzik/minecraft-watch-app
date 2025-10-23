# Minecraft Hodinky - PWA pro Apple Watch 10 & iPhone 13

Plně funkční Progressive Web App s Minecraft hrou optimalizovaná pro Apple Watch a iPhone.

## 🎮 Funkce

- ✅ **Responzivní design** - automaticky se přizpůsobí Apple Watch i iPhone
- ✅ **PWA podpora** - instalovatelná jako aplikace
- ✅ **Offline režim** - funguje i bez internetu díky Service Worker
- ✅ **Touch ovládání** - optimalizováno pro dotykové displeje
- ✅ **Haptic feedback** - vibrace při akcích (iOS)
- ✅ **Audio efekty** - zvuky pohybu, boje a siréna nebezpečí
- ✅ **Živé hodiny** - funkční Minecraft-style ciferník
- ✅ **Uložení skóre** - pamatuje si nejvyšší skóre

## 📱 Podporovaná zařízení

### Apple Watch
- Apple Watch Series 10 (45mm, 49mm)
- Apple Watch Ultra
- Apple Watch SE (40mm, 44mm)

### iPhone
- iPhone 13, 14, 15 (všechny modely)
- iPhone 12 Pro Max a novější
- iPhone SE (3. generace)

## 🚀 Rychlá instalace

### 1. Vygenerovat ikony

```bash
# Otevřete v prohlížeči
open generate-icons.html
```

Klikněte na "Generovat Ikony" a stáhněte všechny ikony do složky `icons/`.

### 2. Spustit lokální server

```bash
# Python 3
python3 -m http.server 8080

# Nebo Node.js
npx serve -p 8080
```

### 3. Otevřít v prohlížeči

Přejděte na: `http://localhost:8080`

## 📲 Instalace na zařízení

### iPhone

1. Otevřete Safari a přejděte na URL aplikace
2. Klikněte na ikonu "Sdílet" (čtverec se šipkou nahoru)
3. Sjeďte dolů a klikněte "Přidat na plochu"
4. Potvrďte název a klikněte "Přidat"

### Apple Watch

1. Nejprve nainstalujte na iPhone (viz výše)
2. Otevřete Watch aplikaci na iPhone
3. Přejděte na "Moje hodinky" → "Dock"
4. Aplikace se automaticky synchronizuje na hodinky

## 🎯 Jak hrát

### Ovládání

- **8 směrů** - pohyb hráče (šipky kolem)
- **Střední tlačítko** - kopání/těžba
- **Horní lišta** - výběr nástrojů

### Nástroje

- ⛏️ **Krumpáč** - těžba bloků
- 🪓 **Sekera** - boj s nepřáteli
- 🔨 **Lopata** - kopání
- ⚔️ **Meč** - hlavní zbraň
- 📦 **Návrat** - vrátit nástroj

### Pravidla

1. **Zabít nepřítele**: Mějte zbraň v ruce + pohybujte se + dotkněte se nepřítele
2. **Těžit bloky**: Vyberte krumpáč + klikněte na střední tlačítko
3. **Skóre**: +10 za blok, +100 za nepřítele
4. **Nebezpečí**: Červený indikátor + siréna = nepřítel blízko!

## 🛠️ Struktura projektu

```
minecraft-watch-app/
├── index.html          # Hlavní HTML
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── css/
│   ├── base.css       # Základní styly
│   ├── watch.css      # Apple Watch optimalizace
│   └── phone.css      # iPhone optimalizace
├── js/
│   └── game.js        # Herní logika
├── icons/
│   └── icon-*.png     # PWA ikony (72-512px)
└── generate-icons.html # Generátor ikon

```

## 🔧 Technologie

- **HTML5** - struktura
- **CSS3** - responzivní design s media queries
- **JavaScript ES6** - herní logika
- **Web Audio API** - zvukové efekty
- **Vibration API** - haptic feedback
- **Service Worker API** - offline režim
- **LocalStorage** - ukládání skóre

## 📐 Responzivní breakpointy

```css
/* Apple Watch */
@media (max-width: 500px) { ... }

/* iPhone a větší */
@media (min-width: 501px) { ... }

/* Extra velké telefony */
@media (min-width: 700px) { ... }
```

## 🐛 Řešení problémů

### Aplikace nefunguje offline
- Otevřete DevTools → Application → Service Workers
- Zkontrolujte, zda je SW zaregistrován
- Vymažte cache a znovu načtěte

### Zvuky nehrají
- iOS vyžaduje uživatelskou interakci pro audio
- První kliknutí aktivuje audio kontext
- Zkontrolujte, zda není iPhone v tichém režimu

### Ikony se nezobrazují
- Zkontrolujte, zda jsou všechny ikony ve složce `icons/`
- Vygenerujte ikony pomocí `generate-icons.html`
- Zkontrolujte cesty v `manifest.json`

## 📝 Changelog

### v1.0.0 (2025-10-23)
- ✅ Plná podpora Apple Watch 10
- ✅ Optimalizace pro iPhone 13
- ✅ PWA s offline režimem
- ✅ Touch ovládání + haptic feedback
- ✅ Audio efekty + varovná siréna
- ✅ Responzivní design
- ✅ Ukládání nejvyššího skóre

## 🎨 Budoucí vylepšení

- [ ] Více levelů a prostředí
- [ ] Multiplayer režim
- [ ] Achievementy
- [ ] Vlastní skiny pro hráče
- [ ] Day/Night cyklus
- [ ] Více typů nepřátel

## 📄 Licence

MIT License - volně k použití

## 👨‍💻 Autor

Vytvořeno pomocí Claude Code (2025)

---

**Užijte si hru! 🎮⛏️**
