<script setup>
import FeatureCard from '../components/FeatureCard.vue'
import GameCard from '../components/GameCard.vue'
import PlayerMessageForm from '../components/PlayerMessageForm.vue'
import BlackCatAi from '../components/BlackCatAi.vue'

const features = [
  { number: '01', title: '街機遊戲', text: '收錄三款可直接遊玩的小遊戲，從遊戲櫃一鍵進入。' },
  { number: '02', title: '深夜風格', text: '黑色、暖黃與低彩度色調，保留街機廳的夜晚氣氛。' },
  { number: '03', title: '快速開始', text: '從首頁選擇遊戲後，就能直接進入對應內容。' }
]

const games = [
  {
    title: '午夜磚牆',
    type: 'BREAKOUT',
    description: '控制擋板反彈小球，清除畫面上的所有磚塊。',
    status: '可遊玩',
    artClass: 'breakout',
    playTo: '/games/breakout',
  },
  {
    title: '夜行貪食蛇',
    type: 'SNAKE',
    description: '在格子賽道上控制蛇身，吃光點變長並刷新高分。',
    status: '可遊玩',
    artClass: 'snake',
    playTo: '/games/snake',
  },
  {
    title: '午夜賽車',
    type: 'RACING',
    description: '在三線道上閃避來車，速度會越來越快。',
    status: '可遊玩',
    artClass: 'racing',
    playTo: '/games/racing',
  },
]

const gameTitles = games.map((game) => game.title)
</script>

<template>
  <div class="home-page">
    <header class="topbar">
      <div class="page topbar-inner">
        <RouterLink class="brand" to="/">
          <span class="cat-mark">●</span>
          <span>BLACK CAT ARCADE</span>
        </RouterLink>
        <nav>
          <a href="#features">特色</a>
          <a href="#games">遊戲</a>
          <a href="#message">留言</a>
          <a href="#ai">店員 AI</a>
        </nav>
      </div>
    </header>

    <main id="home">
      <section class="page hero">
        <div>
          <p class="kicker">OPEN AFTER DARK · V2</p>
          <h1>黑貓<br />街機廳<small>BLACK CAT ARCADE</small></h1>
          <p class="lead">深夜開門的街機小店。挑一台喜歡的機器，開始今晚的遊戲。</p>
          <a class="play-button" href="#games">進入遊戲櫃</a>
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
              :play-to="game.playTo"
            />
          </div>
        </div>
      </section>

      <section id="message" class="section message-section">
        <div class="page">
          <div class="section-heading">
            <p>PLAYER NOTE</p>
            <h2>玩家留言</h2>
          </div>
          <PlayerMessageForm :game-options="gameTitles" />
        </div>
      </section>

      <section id="ai" class="section ai-section">
        <div class="page">
          <div class="section-heading">
            <p>BLACK CAT CLERK</p>
            <h2>黑貓店員 AI</h2>
          </div>
          <BlackCatAi />
        </div>
      </section>
    </main>

    <footer>
      <div class="page footer-inner"><span>BLACK CAT ARCADE V2</span><span>OPEN AFTER DARK</span></div>
    </footer>
  </div>
</template>
