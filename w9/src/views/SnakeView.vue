<script setup>
import GamePageShell from '../components/GamePageShell.vue'
import SnakeGame from '../components/games/SnakeGame.vue'
</script>

<template>
  <GamePageShell
    kicker="SNAKE"
    title="夜行貪食蛇"
    hint="方向鍵控制蛇身方向，吃紅色光點加分並變長，勿撞牆或咬到自己。"
  >
    <SnakeGame />
  </GamePageShell>
</template>
