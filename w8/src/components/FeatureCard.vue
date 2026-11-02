<script setup>
defineProps({
  number: String,
  title: String,
  text: String,
})
</script>

<template>
  <article class="feature-card">
    <span class="feature-number">{{ number }}</span>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </article>
</template>
