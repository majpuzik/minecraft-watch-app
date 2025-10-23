#!/bin/bash

echo "🎮 Minecraft Hodinky - Spouštění serveru..."
echo ""
echo "📱 Aplikace poběží na:"
echo "   http://localhost:8080"
echo "   http://$(ipconfig getifaddr en0 2>/dev/null || echo "YOUR-IP"):8080"
echo ""
echo "📲 Pro instalaci na iPhone:"
echo "   1. Otevřete Safari na iPhone"
echo "   2. Přejděte na výše uvedenou adresu"
echo "   3. Klikněte Sdílet → Přidat na plochu"
echo ""
echo "⌚ Pro instalace na Apple Watch:"
echo "   1. Nejprve nainstalujte na iPhone"
echo "   2. Otevřete Watch app → Dock"
echo "   3. Aplikace se synchronizuje automaticky"
echo ""
echo "🛑 Zastavení: Ctrl+C"
echo ""
echo "─────────────────────────────────────────"
echo ""

# Zkusit Python 3
if command -v python3 &> /dev/null; then
    echo "✅ Používám Python 3..."
    python3 -m http.server 8080
# Fallback na npx serve
elif command -v npx &> /dev/null; then
    echo "✅ Používám Node.js serve..."
    npx serve -p 8080
# Fallback na PHP
elif command -v php &> /dev/null; then
    echo "✅ Používám PHP server..."
    php -S localhost:8080
else
    echo "❌ Chyba: Nenalezen Python3, Node.js ani PHP"
    echo "   Nainstalujte Python 3 nebo Node.js"
    exit 1
fi
