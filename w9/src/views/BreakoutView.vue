<script setup>
import GamePageShell from '../components/GamePageShell.vue'
import BreakoutGame from '../components/games/BreakoutGame.vue'
</script>

<template>
  <GamePageShell
    kicker="BREAKOUT"
    title="午夜磚牆"
    hint="鍵盤 ← → 或滑鼠／觸控移動擋板，反彈小球清除磚塊。"
  >
    <BreakoutGame />
  </GamePageShell>
</template>
