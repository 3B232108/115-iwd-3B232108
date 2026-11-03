<script setup>
import { ref } from 'vue'

const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions'
const MODEL_NAME = 'qwen3.5-4b'
const SYSTEM_PROMPT =
  '你是「黑貓街機廳」的店員。請一律使用繁體中文回答，語氣友善、簡短，每次回答控制在三句以內，不要冗長。'

const question = ref('')
const answer = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function sendQuestion() {
  const text = question.value.trim()
  if (!text || loading.value) return

  loading.value = true
  errorMessage.value = ''
  answer.value = ''

  try {
    const response = await fetch(LM_STUDIO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        temperature: 0.7,
        max_tokens: 256,
      }),
    })

    if (!response.ok) {
      throw new Error(`LM Studio 回應錯誤（${response.status}）`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('未取得 AI 回答，請確認模型是否已載入。')
    }

    answer.value = content.trim()
  } catch (err) {
    const isNetwork =
      err instanceof TypeError ||
      (err.message && /fetch|network|Failed/i.test(err.message))

    errorMessage.value = isNetwork
      ? '無法連線 LM Studio。請確認已在 http://localhost:1234 啟動伺服器，並載入 qwen3.5-4b 模型。'
      : err.message || '發生未知錯誤，請稍後再試。'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="ai-panel">
    <label for="ai-question">向黑貓店員提問</label>
    <textarea
      id="ai-question"
      v-model="question"
      rows="4"
      placeholder="例如：今晚推薦玩哪一款街機？"
      :disabled="loading"
    ></textarea>

    <button
      type="button"
      class="arcade-button"
      :disabled="loading || !question.trim()"
      @click="sendQuestion"
    >
      {{ loading ? '回答中…' : '送出問題' }}
    </button>

    <p v-if="loading" class="ai-status" role="status">載入中，黑貓店員思考中…</p>

    <p v-if="errorMessage" class="ai-feedback ai-feedback-error" role="alert">
      {{ errorMessage }}
    </p>

    <div v-if="answer && !loading" class="ai-answer" aria-live="polite">
      <p class="ai-answer-label">黑貓店員</p>
      <p class="ai-answer-text">{{ answer }}</p>
    </div>
  </div>
</template>
