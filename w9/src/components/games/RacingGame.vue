<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const score = ref(0)
const status = ref('ready')
const statusText = ref('← → 切換車道，閃過迎面而來的車輛')

let ctx = null
let frameId = 0
let running = false

const W = 560
const H = 420
const laneCount = 3
const laneW = W / laneCount
let roadMarkY = []

let playerLane = 1
let speed = 4.5
let tick = 0
let enemies = []

function resetRoadMarks() {
  roadMarkY = Array.from({ length: 10 }, (_, i) => i * 68 - 30)
}

function spawnEnemy() {
  const lane = Math.floor(Math.random() * laneCount)
  enemies.push({
    lane,
    y: -80,
    w: laneW * 0.55,
    h: 72,
  })
}

function drawRoad() {
  ctx.fillStyle = '#121218'
  ctx.fillRect(0, 0, W, H)

  for (let i = 1; i < laneCount; i++) {
    ctx.strokeStyle = 'rgba(242,238,229,.12)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(i * laneW, 0)
    ctx.lineTo(i * laneW, H)
    ctx.stroke()
  }

  ctx.fillStyle = '#e5c45b'
  for (const y of roadMarkY) {
    ctx.fillRect(W / 2 - 3, y, 6, 34)
  }
}

function drawCar(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
  ctx.fillStyle = 'rgba(15,15,18,.55)'
  ctx.fillRect(x + w * 0.18, y + h * 0.18, w * 0.64, h * 0.28)
}

function draw() {
  if (!ctx) return
  drawRoad()

  const px = playerLane * laneW + (laneW - laneW * 0.55) / 2
  const py = H - 96
  drawCar(px, py, laneW * 0.55, 72, '#e5c45b')

  for (const e of enemies) {
    const ex = e.lane * laneW + (laneW - e.w) / 2
    drawCar(ex, e.y, e.w, e.h, '#c96a5b')
  }
}

function hitTest() {
  const px = playerLane * laneW + (laneW - laneW * 0.55) / 2
  const py = H - 96
  const pw = laneW * 0.55
  const ph = 72

  for (const e of enemies) {
    const ex = e.lane * laneW + (laneW - e.w) / 2
    if (px < ex + e.w && px + pw > ex && py < e.y + e.h && py + ph > e.y) {
      return true
    }
  }
  return false
}

function step() {
  if (!running) return
  tick += 1
  if (tick % 75 === 0) spawnEnemy()
  if (tick % 200 === 0) speed += 0.35

  for (let i = 0; i < roadMarkY.length; i++) {
    roadMarkY[i] += speed
    if (roadMarkY[i] > H + 40) roadMarkY[i] -= H + 120
  }

  for (const e of enemies) {
    e.y += speed
  }
  enemies = enemies.filter((e) => e.y < H + 100)

  if (hitTest()) {
    running = false
    status.value = 'over'
    statusText.value = `撞車了！最終分數 ${score.value}`
  }

  score.value = Math.floor(tick / 5)
  draw()
}

function loop() {
  step()
  frameId = requestAnimationFrame(loop)
}

function moveLeft() {
  if (playerLane > 0) playerLane -= 1
}

function moveRight() {
  if (playerLane < laneCount - 1) playerLane += 1
}

function startGame() {
  playerLane = 1
  speed = 4.5
  tick = 0
  score.value = 0
  enemies = []
  resetRoadMarks()
  running = true
  status.value = 'playing'
  statusText.value = '← → 或 A D 切換車道'
  draw()
}

function onKeyDown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    e.preventDefault()
    if (status.value !== 'playing') startGame()
    else moveLeft()
  }
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    e.preventDefault()
    if (status.value !== 'playing') startGame()
    else moveRight()
  }
  if (e.key === 'Enter' && status.value !== 'playing') startGame()
}

function onPointerDown(e) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  if (status.value !== 'playing') startGame()
  else if (x < rect.width / 2) moveLeft()
  else moveRight()
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resetRoadMarks()
  draw()
  window.addEventListener('keydown', onKeyDown)
  frameId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="game-stage">
    <div class="game-hud">
      <span>分數 {{ score }}</span>
      <span>三線道競速</span>
    </div>
    <canvas
      ref="canvasRef"
      class="game-canvas game-canvas-tap"
      :width="W"
      :height="H"
      aria-label="午夜賽車遊戲畫面"
      @pointerdown="onPointerDown"
    />
    <p class="game-status">{{ statusText }}</p>
    <button v-if="status !== 'playing'" type="button" class="arcade-button" @click="startGame">
      {{ status === 'ready' ? '開始競速' : '再跑一局' }}
    </button>
  </div>
</template>
