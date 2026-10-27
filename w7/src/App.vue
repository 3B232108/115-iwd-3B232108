<script setup>
import { computed, ref } from 'vue'

const heightCm = ref('')
const weightKg = ref('')

const bmi = computed(() => {
  const h = Number(heightCm.value)
  const w = Number(weightKg.value)
  if (!h || !w || h <= 0 || w <= 0) return null
  const m = h / 100
  return w / (m * m)
})

const bmiText = computed(() => {
  if (bmi.value === null) return '—'
  return bmi.value.toFixed(1)
})

const category = computed(() => {
  if (bmi.value === null) return '請輸入有效的身高與體重'
  const v = bmi.value
  if (v < 18.5) return '體重過輕'
  if (v < 24) return '正常範圍'
  if (v < 27) return '過重'
  if (v < 30) return '輕度肥胖'
  return '中度肥胖以上'
})

const inputSummary = computed(() => {
  const h = heightCm.value.trim()
  const w = weightKg.value.trim()
  if (!h && !w) return '尚未輸入'
  return `身高 ${h || '—'} cm，體重 ${w || '—'} kg`
})
</script>

<template>
  <div class="page">
    <header class="hero">
      <p class="badge">W7 作業</p>
      <h1>BMI 計算機</h1>
      <p class="lead">輸入身高、體重後，BMI 與分類會自動更新（Vue 3 · ref · computed · v-model）</p>
    </header>

    <main class="card">
      <label class="field">
        <span>身高（cm）</span>
        <input v-model="heightCm" type="number" min="1" step="0.1" placeholder="例如 170" />
      </label>

      <label class="field">
        <span>體重（kg）</span>
        <input v-model="weightKg" type="number" min="1" step="0.1" placeholder="例如 65" />
      </label>

      <p class="hint">{{ inputSummary }}</p>

      <section class="result" aria-live="polite">
        <p class="result-label">BMI</p>
        <p class="result-value">{{ bmiText }}</p>
        <p class="result-category">{{ category }}</p>
      </section>

      <p class="note">公式：體重 ÷ 身高(m)² · 分類僅供教學示範</p>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  margin: 0;
  padding: 24px 16px 40px;
  font-family: 'Microsoft JhengHei', sans-serif;
  background: #f5f4fb;
  color: #15173d;
}

.hero {
  max-width: 520px;
  margin: 0 auto 24px;
  text-align: center;
}

.badge {
  display: inline-block;
  margin: 0 0 8px;
  padding: 4px 14px;
  border-radius: 999px;
  background: #00d9a3;
  color: #15173d;
  font-size: 14px;
  font-weight: 700;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.lead {
  margin: 0;
  color: #6b6f8a;
  font-size: 15px;
  line-height: 1.6;
}

.card {
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 32px rgb(21 23 61 / 8%);
}

.field {
  display: block;
  margin-bottom: 16px;
}

.field span {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e8e6f5;
  border-radius: 10px;
  font-size: 18px;
}

.field input:focus {
  border-color: #5b5fef;
  outline: none;
}

.hint {
  margin: 0 0 20px;
  color: #6b6f8a;
  font-size: 14px;
}

.result {
  padding: 20px;
  border-radius: 12px;
  background: #f3f1ff;
  text-align: center;
}

.result-label {
  margin: 0;
  font-size: 14px;
  color: #6b6f8a;
}

.result-value {
  margin: 4px 0;
  font-size: 40px;
  font-weight: 700;
  color: #5b5fef;
}

.result-category {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.note {
  margin: 16px 0 0;
  font-size: 13px;
  color: #8d8fa6;
  text-align: center;
}
</style>
