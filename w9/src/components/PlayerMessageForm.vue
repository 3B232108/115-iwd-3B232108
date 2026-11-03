<script setup>
import { ref } from 'vue'

defineProps({
  gameOptions: {
    type: Array,
    default: () => [],
  },
})

const nickname = ref('')
const email = ref('')
const favoriteGame = ref('')
const message = ref('')
const submitted = ref(false)
const formError = ref('')

function handleSubmit() {
  formError.value = ''
  submitted.value = false

  if (!nickname.value.trim() || !message.value.trim()) {
    formError.value = '請填寫暱稱與留言內容（必填）。'
    return
  }

  submitted.value = true
}
</script>

<template>
  <form class="arcade-form" @submit.prevent="handleSubmit" novalidate>
    <div class="form-grid">
      <div class="form-field">
        <label for="player-nickname">暱稱 <span class="required-mark">*</span></label>
        <input
          id="player-nickname"
          v-model="nickname"
          type="text"
          name="nickname"
          autocomplete="nickname"
          placeholder="你的暱稱"
          required
        />
      </div>

      <div class="form-field">
        <label for="player-email">Email</label>
        <input
          id="player-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="example@email.com"
        />
      </div>

      <div class="form-field form-field-full">
        <label for="player-game">想玩的遊戲</label>
        <select id="player-game" v-model="favoriteGame" name="favoriteGame">
          <option value="">請選擇</option>
          <option v-for="game in gameOptions" :key="game" :value="game">
            {{ game }}
          </option>
        </select>
      </div>

      <div class="form-field form-field-full">
        <label for="player-message">留言內容 <span class="required-mark">*</span></label>
        <textarea
          id="player-message"
          v-model="message"
          name="message"
          rows="4"
          placeholder="想對黑貓街機廳說的話…"
          required
        ></textarea>
      </div>
    </div>

    <p v-if="formError" class="form-feedback form-feedback-error" role="alert">
      {{ formError }}
    </p>
    <p v-if="submitted" class="form-feedback form-feedback-success" role="status">
      留言已送出
    </p>

    <button type="submit" class="arcade-button">送出留言</button>
  </form>
</template>
