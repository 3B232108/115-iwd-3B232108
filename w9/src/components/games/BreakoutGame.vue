<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
const score = ref(0)
const lives = ref(3)
const status = ref('ready')
const statusText = ref('按 Enter 或點「開始」清除所有磚塊')

let ctx = null
let frameId = 0
let running = false

const W = 560
const H = 420

const paddle = { w: 92, h: 12, x: W / 2 - 46, y: H - 28 }
const ball = { x: W / 2, y: H - 48, r: 7, vx: 3.2, vy: -3.2 }
let bricks = []

const colors = ['#e5c45b', '#c96a5b', '#6d7fb7', '#789479', '#aaa49b']

function resetBall() {
  ball.x = W / 2
  ball.y = H - 48
  ball.vx = (Math.random() > 0.5 ? 1 : -1) * 3.2
  ball.vy = -3.2
}

function initBricks() {
  bricks = []
  const cols = 8
  const rows = 5
  const padX = 24
  const padY = 52
  const gap = 6
  const bw = (W - padX * 2 - gap * (cols - 1)) / cols
  const bh = 22
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      bricks.push({
        x: padX + c * (bw + gap),
        y: padY + r * (bh + gap),
        w: bw,
        h: bh,
        alive: true,
        color: colors[r % colors.length],
      })
    }
  }
}

function draw() {
  if (!ctx) return
  ctx.fillStyle = '#0f0f12'
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = 'rgba(229,196,91,.25)'
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

  for (const b of bricks) {
    if (!b.alive) continue
    ctx.fillStyle = b.color
    ctx.fillRect(b.x, b.y, b.w, b.h)
  }

  ctx.fillStyle = '#e5c45b'
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h)

  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
  ctx.fillStyle = '#f2eee5'
  ctx.fill()
}

function step() {
  if (!running) return

  ball.x += ball.vx
  ball.y += ball.vy

  if (ball.x - ball.r < 0 || ball.x + ball.r > W) ball.vx *= -1
  if (ball.y - ball.r < 0) ball.vy *= -1

  if (
    ball.y + ball.r >= paddle.y &&
    ball.y - ball.r <= paddle.y + paddle.h &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.w &&
    ball.vy > 0
  ) {
    const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)
    ball.vy = -Math.abs(ball.vy)
    ball.vx = hit * 4.5
  }

  if (ball.y - ball.r > H) {
    lives.value -= 1
    if (lives.value <= 0) {
      running = false
      status.value = 'over'
      statusText.value = 'Game Over — 再試一次？'
    } else {
      resetBall()
      running = false
      status.value = 'paused'
      statusText.value = `失去一命，剩 ${lives.value} 條命 — 按 Enter 繼續`
    }
  }

  for (const b of bricks) {
    if (!b.alive) continue
    if (
      ball.x + ball.r > b.x &&
      ball.x - ball.r < b.x + b.w &&
      ball.y + ball.r > b.y &&
      ball.y - ball.r < b.y + b.h
    ) {
      b.alive = false
      ball.vy *= -1
      score.value += 10
    }
  }

  if (bricks.every((b) => !b.alive)) {
    running = false
    status.value = 'win'
    statusText.value = '通關！你清空了所有磚塊'
  }

  draw()
}

function loop() {
  step()
  frameId = requestAnimationFrame(loop)
}

function startGame() {
  score.value = 0
  lives.value = 3
  status.value = 'playing'
  statusText.value = '← → 或滑鼠移動擋板'
  paddle.x = W / 2 - paddle.w / 2
  initBricks()
  resetBall()
  running = true
  draw()
}

function resumeAfterLife() {
  status.value = 'playing'
  statusText.value = '← → 或滑鼠移動擋板'
  running = true
}

function onKeyDown(e) {
  if (e.key === 'ArrowLeft') paddle.x = Math.max(8, paddle.x - 18)
  if (e.key === 'ArrowRight') paddle.x = Math.min(W - paddle.w - 8, paddle.x + 18)
  if (e.key === 'Enter') {
    if (status.value === 'ready' || status.value === 'over' || status.value === 'win') startGame()
    else if (status.value === 'paused') resumeAfterLife()
  }
}

function onMouseMove(e) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const scale = W / rect.width
  const x = (e.clientX - rect.left) * scale
  paddle.x = Math.min(Math.max(8, x - paddle.w / 2), W - paddle.w - 8)
}

function onTouchMove(e) {
  if (!e.touches[0]) return
  onMouseMove({ clientX: e.touches[0].clientX })
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  initBricks()
  draw()
  window.addEventListener('keydown', onKeyDown)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('touchmove', onTouchMove, { passive: true })
  frameId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  window.removeEventListener('keydown', onKeyDown)
  canvasRef.value?.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="game-stage">
    <div class="game-hud">
      <span>分數 {{ score }}</span>
      <span>生命 {{ lives }}</span>
    </div>
    <canvas ref="canvasRef" class="game-canvas" :width="W" :height="H" aria-label="午夜磚牆遊戲畫面" />
    <p class="game-status">{{ statusText }}</p>
    <button
      v-if="status !== 'playing'"
      type="button"
      class="arcade-button"
      @click="status === 'paused' ? resumeAfterLife() : startGame()"
    >
      {{ status === 'ready' ? '開始遊戲' : '再玩一次' }}
    </button>
  </div>
</template>
