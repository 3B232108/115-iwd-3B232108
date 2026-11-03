<script setup>
defineProps({
  title: String,
  type: String,
  description: String,
  status: String,
  artClass: String,
  playTo: String,
})
</script>

<template>
  <article class="game-card">
    <div class="game-art" :class="artClass">
      <div v-if="artClass === 'breakout'" class="brick-row"></div>
      <div v-else-if="artClass === 'snake'" class="snake-preview"></div>
      <div v-else-if="artClass === 'racing'" class="racing-preview"></div>
      <div v-else-if="artClass === 'runner'" class="road-line"></div>
      <div v-else class="coin-ring"></div>
    </div>
    <div class="game-body">
      <span class="game-type">{{ type }}</span>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="game-footer">
        <span>單人</span>
        <span class="game-status-label">{{ status }}</span>
      </div>
      <RouterLink v-if="playTo" :to="playTo" class="game-play-link">開始遊戲</RouterLink>
    </div>
  </article>
</template>
