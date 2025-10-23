#!/bin/bash

# Jednoduchý generátor ikon pomocí ImageMagick
# Použití: ./create-icons-simple.sh

echo "🎨 Generování ikon pro Minecraft Hodinky..."

mkdir -p icons

sizes=(72 96 128 144 152 167 180 192 384 512)

for size in "${sizes[@]}"; do
    magick -size ${size}x${size} xc:"#8B4513" \
        -fill "#7CBD3B" -draw "rectangle 0,$((size*4/5)) $size,$size" \
        -fill "#666" -draw "rectangle $((size*7/16)),$((size/2)) $((size*9/16)),$((size*5/6))" \
        -fill "#888" -draw "rectangle $((size/4)),$((size*3/8)) $((size*3/4)),$((size*5/8))" \
        -fill white -font Arial-Bold -pointsize $((size/3)) \
        -gravity North -annotate +0+$((size/10)) "M" \
        -stroke black -strokewidth $((size/40)) -draw "rectangle 1,1 $((size-2)),$((size-2))" \
        icons/icon-$size.png

    if [ $? -eq 0 ]; then
        echo "✅ Vytvořena ikona ${size}x${size}"
    else
        echo "❌ Chyba při vytváření ikony ${size}x${size}"
    fi
done

echo ""
echo "🎉 Hotovo! Ikony jsou ve složce icons/"
