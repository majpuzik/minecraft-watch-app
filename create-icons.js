#!/usr/bin/env node

// Generátor ikon pro Minecraft Hodinky
// Použití: node create-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Pozadí - Minecraft hnědý
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, size, size);

    // Border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = Math.max(2, size / 40);
    ctx.strokeRect(0, 0, size, size);

    // Minecraft krumpáč
    ctx.fillStyle = '#666';
    const centerX = size / 2;
    const centerY = size / 2;
    const toolSize = size / 3;

    // Rukojeť
    ctx.fillRect(centerX - toolSize/8, centerY, toolSize/4, toolSize);

    // Hlava krumpáče
    ctx.fillStyle = '#888';
    ctx.fillRect(centerX - toolSize/2, centerY - toolSize/4, toolSize, toolSize/3);

    // Písmeno "M"
    ctx.fillStyle = '#FFF';
    ctx.font = `bold ${size/3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('M', centerX, size/10);

    // Zelená tráva
    ctx.fillStyle = '#7CBD3B';
    ctx.fillRect(0, size * 0.8, size, size * 0.2);

    return canvas;
}

// Vytvoření složky
if (!fs.existsSync('icons')) {
    fs.mkdirSync('icons');
    console.log('✅ Složka icons/ vytvořena');
}

// Generování ikon
sizes.forEach(size => {
    try {
        const canvas = generateIcon(size);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(`icons/icon-${size}.png`, buffer);
        console.log(`✅ Vytvořena ikona ${size}x${size}`);
    } catch (error) {
        console.error(`❌ Chyba při vytváření ikony ${size}x${size}:`, error.message);
    }
});

console.log('\n🎉 Všechny ikony úspěšně vygenerovány!');
console.log('📁 Najdete je ve složce: icons/\n');
