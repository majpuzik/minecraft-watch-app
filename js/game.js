// Minecraft Watch Game - Apple Watch & iPhone verze
const watch = document.getElementById('watch');
const gameWorld = document.getElementById('gameWorld');
const blocks = [];
const gameBlocks = [];
const enemies = [];

// Detekce zařízení
const isWatch = window.innerWidth <= 500;
const scale = isWatch ? 0.75 : 1;

// Pozice a velikosti podle zařízení
const blockSize = isWatch ? 22 : 30;
const playerStartX = isWatch ? window.innerWidth * 0.42 : window.innerWidth * 0.43;
const playerStartY = isWatch ? window.innerHeight * 0.15 : window.innerHeight * 0.18;

let playerX = playerStartX;
let playerY = playerStartY;
let toolInHand = null;
let toolSlot = null;
let isJumping = false;
let velocityY = 0;
let velocityX = 0;
const gravity = 0.8;
const jumpPower = isWatch ? -10 : -12;
let score = 0;
let maxScore = parseInt(localStorage.getItem('maxScore')) || 0;
let isGameOver = false;
let lastMoveTime = 0;

// Audio
let audioContext = null;
let sirenPlaying = false;

const tools = {
    pickaxe: '⛏️',
    axe: '🪓',
    shovel: '🔨',
    sword: '⚔️'
};

// Inicializace audio
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('🔊 Audio inicializováno');
    }
}

// Zvuky
function playMoveBeep() {
    if (!audioContext) initAudio();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

function startSiren() {
    if (!audioContext) initAudio();
    if (sirenPlaying) return;

    sirenPlaying = true;
    sirenLoop();
}

function sirenLoop() {
    if (!sirenPlaying || isGameOver) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sawtooth';
    gainNode.gain.value = 0.03;

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);

    setTimeout(() => sirenLoop(), 600);
}

function stopSiren() {
    sirenPlaying = false;
}

function playDeathSound() {
    if (!audioContext) initAudio();

    const notes = [262, 294, 330, 349, 262];
    notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.value = 0.08;
        osc.start(audioContext.currentTime + i * 0.5);
        osc.stop(audioContext.currentTime + i * 0.5 + 0.4);
    });
}

function playKillSound() {
    if (!audioContext) initAudio();

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.3);
}

// Kontrola bloku
function hasBlockAt(x, y) {
    return gameBlocks.some(b =>
        Math.abs((b.x * blockSize + 20) - x) < blockSize/2 &&
        Math.abs((b.y * blockSize + window.innerHeight * 0.3) - y) < blockSize/2
    );
}

// Gravitace
function applyGravity() {
    if (!isJumping) {
        if (!hasBlockAt(playerX, playerY + 32)) {
            isJumping = true;
        }
    }

    if (isJumping) {
        velocityY += gravity;
        playerY += velocityY;
        playerX += velocityX;
        velocityX *= 0.9;

        if (hasBlockAt(playerX, playerY + 32) && velocityY > 0) {
            const blockY = Math.round((playerY + 32 - window.innerHeight * 0.3) / blockSize) * blockSize + window.innerHeight * 0.3;
            playerY = blockY - 32;
            velocityY = 0;
            velocityX = 0;
            isJumping = false;
        }

        if (playerY > window.innerHeight) {
            playerY = playerStartY;
            playerX = playerStartX;
            velocityY = 0;
            velocityX = 0;
            isJumping = false;
        }

        document.getElementById('player').style.left = playerX + 'px';
        document.getElementById('player').style.top = playerY + 'px';
    }

    checkEnemyProximity();
}

// Kontrola nebezpečí
function checkEnemyProximity() {
    const dangerDistance = isWatch ? 60 : 80;
    let danger = false;

    enemies.forEach(enemy => {
        const dx = playerX - enemy.x;
        const dy = playerY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < dangerDistance) {
            danger = true;
        }
    });

    const warning = document.getElementById('dangerWarning');
    if (danger) {
        warning.classList.add('active');
        startSiren();
    } else {
        warning.classList.remove('active');
        stopSiren();
    }
}

// Event listenery pro hotbar
document.querySelectorAll('.hotbar-slot').forEach(slot => {
    slot.addEventListener('click', (e) => {
        const tool = slot.getAttribute('data-tool');
        if (tool === 'return') {
            returnTool(slot);
        } else {
            takeTool(tool, slot);
        }
    });
});

// Event listenery pro ovládání
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dir = btn.getAttribute('data-dir');
        const action = btn.getAttribute('data-action');

        if (dir) {
            move(dir);
        } else if (action === 'mine') {
            mine();
        }
    });

    // Touch podpora
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btn.click();
    });
});

// Restart tlačítko
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Vzít nástroj
function takeTool(tool, slot) {
    if (toolInHand) {
        toolSlot.textContent = tools[toolInHand];
    }
    slot.textContent = '';
    toolInHand = tool;
    toolSlot = slot;
    document.getElementById('playerTool').textContent = tools[tool];

    document.querySelectorAll('.hotbar-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');

    // Haptic feedback na iOS
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

// Vrátit nástroj
function returnTool(slot) {
    if (toolInHand && toolSlot) {
        toolSlot.textContent = tools[toolInHand];
        document.getElementById('playerTool').textContent = '';
        toolInHand = null;
        toolSlot = null;
        document.querySelectorAll('.hotbar-slot').forEach(s => s.classList.remove('selected'));
    }
}

// Kopání
function mine() {
    if (!toolInHand || isGameOver) {
        return;
    }

    const gridX = Math.round((playerX - 20) / blockSize);
    const gridY = Math.round((playerY - window.innerHeight * 0.3) / blockSize) + 1;
    const idx = gameBlocks.findIndex(b => b.x === gridX && b.y === gridY);

    if (idx !== -1) {
        gameBlocks[idx].element.remove();
        gameBlocks.splice(idx, 1);
        addScore(10);

        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    }
}

// Skóre
function addScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
    if (score > maxScore) {
        maxScore = score;
        document.getElementById('maxScore').textContent = maxScore;
        localStorage.setItem('maxScore', maxScore);
    }
}

// Spawn nepřítel
function spawnEnemy() {
    if (isGameOver) return;

    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    const spawnX = window.innerWidth * 0.25 + Math.random() * window.innerWidth * 0.5;
    enemy.style.left = spawnX + 'px';
    enemy.style.top = '20px';
    gameWorld.appendChild(enemy);
    enemies.push({
        element: enemy,
        x: spawnX,
        y: 20,
        velocityY: 0,
        onGround: false
    });
}

// Update nepřátelé
function updateEnemies() {
    if (isGameOver) return;

    const now = Date.now();

    enemies.forEach((enemy, idx) => {
        if (!enemy.onGround) {
            enemy.velocityY += 0.8;
            enemy.y += enemy.velocityY;

            if (hasBlockAt(enemy.x, enemy.y + 20)) {
                const blockY = Math.round((enemy.y + 20 - window.innerHeight * 0.3) / blockSize) * blockSize + window.innerHeight * 0.3;
                enemy.y = blockY - 20;
                enemy.velocityY = 0;
                enemy.onGround = true;
            }
        }

        enemy.element.style.left = enemy.x + 'px';
        enemy.element.style.top = enemy.y + 'px';

        // Kolize
        const playerCollisionX = playerX + 10;
        const dist = Math.sqrt(Math.pow(playerCollisionX - enemy.x, 2) + Math.pow(playerY - enemy.y, 2));

        if (dist < 30) {
            const hasWeapon = (toolInHand === 'sword' || toolInHand === 'pickaxe' || toolInHand === 'axe');
            const timeSinceLastMove = now - lastMoveTime;
            const recentMove = (timeSinceLastMove < 1000);
            const hasAnyVelocity = (velocityY !== 0 || velocityX !== 0);
            const anyMovement = recentMove || hasAnyVelocity;

            if (hasWeapon && anyMovement) {
                enemy.element.remove();
                enemies.splice(idx, 1);
                addScore(100);

                if (velocityY > 0) {
                    velocityY = jumpPower * 0.5;
                }

                playKillSound();

                if (window.navigator.vibrate) {
                    window.navigator.vibrate([50, 30, 50]);
                }
            } else {
                gameOver();
            }
        }

        if (enemy.y > window.innerHeight + 50) {
            enemy.element.remove();
            enemies.splice(idx, 1);
        }
    });
}

// Game Over
function gameOver() {
    if (isGameOver) return;
    isGameOver = true;
    stopSiren();

    // Krvavé efekty
    for (let i = 0; i < 5; i++) {
        const blood = document.createElement('div');
        blood.className = 'blood-splatter';
        blood.style.left = (playerX - 100 + Math.random() * 200) + 'px';
        blood.style.top = (playerY - 100 + Math.random() * 200) + 'px';
        blood.style.opacity = '0.8';
        gameWorld.appendChild(blood);
    }

    playDeathSound();

    if (window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100, 50, 100]);
    }

    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';
}

// Restart
function restartGame() {
    isGameOver = false;
    score = 0;
    playerX = playerStartX;
    playerY = playerStartY;
    velocityX = 0;
    velocityY = 0;
    isJumping = false;

    document.getElementById('score').textContent = '0';
    document.getElementById('gameOver').style.display = 'none';

    enemies.forEach(e => e.element.remove());
    enemies.length = 0;

    document.querySelectorAll('.blood-splatter').forEach(b => b.remove());

    document.getElementById('player').style.left = playerX + 'px';
    document.getElementById('player').style.top = playerY + 'px';

    stopSiren();
    document.getElementById('dangerWarning').classList.remove('active');
}

// Pohyb
function move(dir) {
    lastMoveTime = Date.now();
    playMoveBeep();

    if (window.navigator.vibrate) {
        window.navigator.vibrate(5);
    }

    const step = isWatch ? 22 : 30;

    if (dir === 'up') {
        if (!isJumping) {
            isJumping = true;
            velocityY = jumpPower;
            velocityX = 0;
        }
    } else if (dir === 'up-left') {
        if (!isJumping) {
            isJumping = true;
            velocityY = jumpPower;
            velocityX = -3;
        }
    } else if (dir === 'up-right') {
        if (!isJumping) {
            isJumping = true;
            velocityY = jumpPower;
            velocityX = 3;
        }
    } else if (dir === 'down') {
        playerY += step;
        document.getElementById('player').style.top = playerY + 'px';
    } else if (dir === 'left') {
        playerX -= step;
        document.getElementById('player').style.left = playerX + 'px';
    } else if (dir === 'right') {
        playerX += step;
        document.getElementById('player').style.left = playerX + 'px';
    } else if (dir === 'down-left') {
        playerX -= step;
        playerY += step;
        document.getElementById('player').style.left = playerX + 'px';
        document.getElementById('player').style.top = playerY + 'px';
    } else if (dir === 'down-right') {
        playerX += step;
        playerY += step;
        document.getElementById('player').style.left = playerX + 'px';
        document.getElementById('player').style.top = playerY + 'px';
    }
}

// Stavba pyramidy
const pyramidRows = isWatch ? 3 : 4;
const pyramidData = [];

for (let y = 0; y < pyramidRows; y++) {
    const row = [];
    const width = 2 + y * 2;
    const startX = 5 - y;
    for (let i = 0; i < width; i++) {
        row.push(startX + i);
    }
    pyramidData.push(row);
}

pyramidData.forEach((row, y) => {
    row.forEach(x => {
        const block = document.createElement('div');
        block.className = 'game-block ' + (y === 0 ? 'grass' : y < 2 ? 'dirt' : 'stone');
        block.style.left = (x * blockSize + 20) + 'px';
        block.style.top = (y * blockSize + window.innerHeight * 0.3) + 'px';
        gameWorld.appendChild(block);
        gameBlocks.push({element: block, x: x, y: y});
    });
});

// Hodinky bloky
const clockBlockCount = isWatch ? 24 : 33;
for (let i = 0; i < clockBlockCount; i++) {
    const angle = i * (360 / clockBlockCount);
    const rad = angle * Math.PI / 180;
    const radius = Math.min(window.innerWidth, window.innerHeight) / 2 - (isWatch ? 35 : 50);
    const x = window.innerWidth / 2 + radius * Math.cos(rad - Math.PI/2);
    const y = window.innerHeight / 2 + radius * Math.sin(rad - Math.PI/2);

    const block = document.createElement('div');
    block.className = 'block';
    block.style.left = (x - blockSize/2) + 'px';
    block.style.top = (y - blockSize/2) + 'px';
    block.style.transform = `rotate(${angle}deg)`;
    watch.appendChild(block);
    blocks.push(block);
}

// Aktualizace hodin
function updateClock() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const hIdx = Math.round((h / 12) * clockBlockCount) % clockBlockCount;
    const mIdx = Math.round((m / 60) * clockBlockCount) % clockBlockCount;
    const sIdx = Math.round((s / 60) * clockBlockCount) % clockBlockCount;

    blocks.forEach((b, i) => {
        b.style.background = '#8B4513';
        b.style.width = (isWatch ? 24 : 32) + 'px';
        b.style.height = (isWatch ? 24 : 32) + 'px';
        b.textContent = '';

        if (i === hIdx) {
            b.style.background = '#0066FF';
            b.textContent = h || 12;
        }
        if (i === mIdx) {
            b.style.background = 'linear-gradient(to right, #8B4513 0%, #8B4513 40%, #0066FF 40%, #0066FF 60%, #8B4513 60%)';
            b.textContent = m;
        }
        if (i === sIdx) {
            b.style.background = 'linear-gradient(to right, #8B4513 0%, #8B4513 40%, #FF0000 40%, #FF0000 60%, #8B4513 60%)';
            b.style.width = (isWatch ? 30 : 40) + 'px';
            b.style.height = (isWatch ? 30 : 40) + 'px';
            b.textContent = s;
        }
    });
}

// Inicializace
document.getElementById('maxScore').textContent = maxScore;
setInterval(applyGravity, 30);
setInterval(updateEnemies, 50);
setInterval(spawnEnemy, isWatch ? 6000 : 5000);
setInterval(updateClock, 100);
updateClock();

console.log('✅ Minecraft Watch - Hra spuštěna!');
console.log('📱 Zařízení:', isWatch ? 'Apple Watch' : 'iPhone');
console.log('⚔️ Zbraně: MEČ (⚔️), KRUMPÁČ (⛏️), SEKERA (🪓)');
console.log('🎮 PRAVIDLO: Zbraň v ruce + pohyb + dotyk = VÝHRA!');
