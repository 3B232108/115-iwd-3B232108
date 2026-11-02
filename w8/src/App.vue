<script setup>
import FeatureCard from './components/FeatureCard.vue'
import GameCard from './components/GameCard.vue'

const features = [
  { number: '01', title: '街機遊戲', text: '收錄簡單直接的小遊戲，適合隨時開一局。' },
  { number: '02', title: '深夜風格', text: '黑色、暖黃與低彩度色調，保留街機廳的夜晚氣氛。' },
  { number: '03', title: '快速開始', text: '從首頁選擇遊戲後，就能直接進入對應內容。' }
]

const games = [
  { title: '午夜磚牆', type: 'BREAKOUT', description: '控制擋板反彈小球，清除畫面上的所有磚塊。', status: '準備中', artClass: 'breakout' },
  { title: '霓虹跑道', type: 'RUNNER', description: '沿著夜色中的跑道前進，閃過障礙並持續累積分數。', status: '準備中', artClass: 'runner' },
  { title: '幸運投幣口', type: 'ARCADE', description: '投入代幣，試著在有限次數內拿到最高分。', status: '準備中', artClass: 'coin' }
]
</script>

<template>
  <header class="topbar">
    <div class="page topbar-inner">
      <a class="brand" href="#home">
        <span class="cat-mark">●</span>
        <span>BLACK CAT ARCADE</span>
      </a>
      <nav>
        <a href="#features">特色</a>
        <a href="#games">遊戲</a>
      </nav>
    </div>
  </header>

  <main id="home">
    <section class="page hero">
      <div>
        <p class="kicker">OPEN AFTER DARK</p>
        <h1>黑貓<br />街機廳<small>BLACK CAT ARCADE</small></h1>
        <p class="lead">深夜開門的街機小店。挑一台喜歡的機器，開始今晚的遊戲。</p>
        <a class="play-button" href="#games">進入街機廳</a>
      </div>

      <div class="poster-wrap">
        <div class="poster">
          <span class="poster-label">BLACK CAT ARCADE</span>
          <div class="moon"></div>
          <div class="cat">
            <div class="cat-head"><i class="eye left"></i><i class="eye right"></i></div>
            <div class="cat-body"></div>
            <div class="tail"></div>
          </div>
          <strong class="poster-night">NIGHT<br />PLAY</strong>
        </div>
      </div>
    </section>

    <section id="features" class="section">
      <div class="page">
        <div class="section-heading"><p>ARCADE INFO</p><h2>店內特色</h2></div>
        <div class="feature-grid">
          <FeatureCard
            v-for="item in features"
            :key="item.number"
            :number="item.number"
            :title="item.title"
            :text="item.text"
          />
        </div>
      </div>
    </section>

    <section id="games" class="section games-section">
      <div class="page">
        <div class="section-heading"><p>GAME SHELF</p><h2>遊戲櫃</h2></div>
        <div class="game-grid">
          <GameCard
            v-for="game in games"
            :key="game.title"
            :title="game.title"
            :type="game.type"
            :description="game.description"
            :status="game.status"
            :art-class="game.artClass"
          />
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="page footer-inner"><span>BLACK CAT ARCADE</span><span>OPEN AFTER DARK</span></div>
  </footer>
</template>
