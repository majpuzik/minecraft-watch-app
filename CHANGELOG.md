# CHANGELOG

## [1.1.0] - 2025-10-23 - Oprava časového prstence

### 🐛 Opraveno

**Časový prstenec kostiček:**
- ✅ **Kostičky jsou nyní přitlačené k sobě** - používá se překrytí 0.85 šířky kostičky
- ✅ **Celý obvod je vyplněn** - počet kostiček se dynamicky vypočítává podle obvodu kruhu
- ✅ **Správný radius** - kostičky jsou na vnějším okraji watch elementu
- ✅ **Responzivní** - funguje pro Apple Watch (300px), iPhone (400px) i větší displeje
- ✅ **Kruhový tvar** - opraveno `border-radius: 50%` místo `50px`

### 🔧 Technické detaily

#### Výpočet počtu kostiček:
```javascript
const circumference = 2 * π * radius;
const blockCount = Math.floor(circumference / (blockWidth * 0.85));
```

#### Příklad pro iPhone 400x400:
- **Watch velikost:** 400px
- **Border:** 15px
- **Block width:** 32px
- **Radius:** 177px (od středu k středu kostičky)
- **Obvod:** 1111.77px
- **Počet kostiček:** ~41 (místo původních 33)
- **Pokrytí:** 118% (kostičky se lehce překrývají = přitlačené k sobě)

#### Příklad pro Apple Watch 300x300:
- **Watch velikost:** 300px
- **Border:** 5px
- **Block width:** 24px
- **Radius:** 133px
- **Obvod:** 835.66px
- **Počet kostiček:** ~41
- **Pokrytí:** 118%

### 📊 Test stránka

Přidán `test-clock.html` pro vizuální kontrolu časového prstence:
- Zobrazuje 3 velikosti (300, 400, 500px)
- Statistiky pro každou velikost
- Zvýrazněné hodinové značky (modré)

### 📝 Změněné soubory

1. **js/game.js**
   - Přepočítán `clockBlockCount` podle obvodu kruhu
   - Správný výpočet radiusu s bordery
   - Použití `watch.offsetWidth/Height` místo `window.inner*`

2. **css/watch.css**
   - Opraveno `border-radius: 50%` místo `50px`

3. **test-clock.html** (nový)
   - Test stránka pro vizuální kontrolu

---

## [1.0.0] - 2025-10-23 - Iniciální release

### ✨ Funkce

- PWA aplikace pro Apple Watch 10 & iPhone 13
- Responzivní design (automatická detekce)
- Offline režim (Service Worker)
- Touch ovládání + haptic feedback
- Audio efekty + varovná siréna
- Živé Minecraft hodiny
- Uložení max skóre (localStorage)
- GitHub Pages deploy
- Instalační stránka s QR kódem

---

**Verze:** 1.1.0
**Poslední aktualizace:** 2025-10-23
**Autor:** majpuzik
**Licence:** MIT
