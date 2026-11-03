<script setup>
import GamePageShell from '../components/GamePageShell.vue'
import RacingGame from '../components/games/RacingGame.vue'
</script>

<template>
  <GamePageShell
    kicker="RACING"
    title="午夜賽車"
    hint="← →（或 A / D、點畫面左右）切換車道，避開紅色來車，分數隨時間增加。"
  >
    <RacingGame />
  </GamePageShell>
</template>
