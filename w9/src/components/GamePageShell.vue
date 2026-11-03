<script setup>
defineProps({
  kicker: String,
  title: String,
  hint: String,
})
</script>

<template>
  <div class="game-page">
    <header class="topbar">
      <div class="page topbar-inner">
        <RouterLink class="brand" to="/">
          <span class="cat-mark">●</span>
          <span>BLACK CAT ARCADE</span>
        </RouterLink>
        <nav class="game-nav">
          <RouterLink :to="{ path: '/', hash: '#games' }">返回遊戲櫃</RouterLink>
        </nav>
      </div>
    </header>

    <main class="page game-page-main">
      <div class="game-page-heading">
        <p class="kicker">{{ kicker }}</p>
        <h1>{{ title }}</h1>
        <p v-if="hint" class="game-hint">{{ hint }}</p>
      </div>
      <slot />
    </main>

    <footer>
      <div class="page footer-inner">
        <span>BLACK CAT ARCADE</span>
        <span>OPEN AFTER DARK</span>
      </div>
    </footer>
  </div>
</template>
