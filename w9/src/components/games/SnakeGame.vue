<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const score = ref(0)
const status = ref('ready')
const statusText = ref('方向鍵控制蛇身，吃到光點變長')

let ctx = null
let frameId = 0
let running = false
let tickMs = 130
let lastTick = 0

const cols = 20
const rows = 20
const W = 560
const H = 560
const cell = W / cols

let snake = []
let dir = { x: 1, y: 0 }
let nextDir = { x: 1, y: 0 }
let food = { x: 10, y: 10 }

function resetSnake() {
  snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ]
  dir = { x: 1, y: 0 }
  nextDir = { x: 1, y: 0 }
}

function placeFood() {
  let spot = { x: 0, y: 0 }
  do {
    spot = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    }
  } while (snake.some((s) => s.x === spot.x && s.y === spot.y))
  food = spot
}

function drawCell(x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2)
}

function draw() {
  if (!ctx) return
  ctx.fillStyle = '#0f0f12'
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = 'rgba(45,43,49,.8)'
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath()
    ctx.moveTo(i * cell, 0)
    ctx.lineTo(i * cell, H)
    ctx.stroke()
  }
  for (let j = 0; j <= rows; j++) {
    ctx.beginPath()
    ctx.moveTo(0, j * cell)
    ctx.lineTo(W, j * cell)
    ctx.stroke()
  }

  drawCell(food.x, food.y, '#c96a5b')

  snake.forEach((part, i) => {
    drawCell(part.x, part.y, i === 0 ? '#e5c45b' : '#789479')
  })
}

function step() {
  dir = nextDir
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    gameOver()
    return
  }
  if (snake.some((s) => s.x === head.x && s.y === head.y)) {
    gameOver()
    return
  }

  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    placeFood()
    if (tickMs > 75) tickMs -= 3
  } else {
    snake.pop()
  }

  draw()
}

function gameOver() {
  running = false
  status.value = 'over'
  statusText.value = `撞到了！最終分數 ${score.value}`
}

function loop(now) {
  if (running && now - lastTick >= tickMs) {
    lastTick = now
    step()
  } else if (running) {
    draw()
  }
  frameId = requestAnimationFrame(loop)
}

function startGame() {
  score.value = 0
  tickMs = 130
  resetSnake()
  placeFood()
  running = true
  status.value = 'playing'
  statusText.value = '↑ ↓ ← → 控制方向'
  lastTick = performance.now()
  draw()
}

function setDirection(x, y) {
  if (dir.x === -x && dir.y === -y) return
  nextDir = { x, y }
}

function onKeyDown(e) {
  const map = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  }
  if (map[e.key]) {
    e.preventDefault()
    const [x, y] = map[e.key]
    if (status.value !== 'playing') startGame()
    setDirection(x, y)
  }
  if (e.key === 'Enter' && status.value !== 'playing') startGame()
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resetSnake()
  placeFood()
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
      <span>越吃越快</span>
    </div>
    <canvas ref="canvasRef" class="game-canvas" :width="W" :height="H" aria-label="貪食蛇遊戲畫面" />
    <p class="game-status">{{ statusText }}</p>
    <button v-if="status !== 'playing'" type="button" class="arcade-button" @click="startGame">
      {{ status === 'ready' ? '開始遊戲' : '再玩一次' }}
    </button>
  </div>
</template>
