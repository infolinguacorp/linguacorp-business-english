<template>
  <div class="quiz-mc" style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin:20px 0;">
    <div style="font-weight:600;color:#1E1B4B;margin-bottom:12px;font-size:1.05rem;">
      <span style="color:#4F46E5;margin-right:6px;">❓</span>{{ question }}
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <button
        v-for="(opt, i) in options"
        :key="i"
        @click="select(i)"
        :disabled="answered"
        :style="buttonStyle(i)"
        style="text-align:left;padding:12px 16px;border-radius:8px;border:2px solid #E5E7EB;background:#fff;cursor:pointer;font-size:0.95rem;transition:all 0.2s;"
      >
        <span style="display:inline-block;width:24px;font-weight:700;color:#4F46E5;">{{ letters[i] }}</span>
        {{ opt }}
      </button>
    </div>
    <div v-if="answered" style="margin-top:14px;padding:12px 16px;border-radius:8px;font-weight:500;" :style="feedbackStyle">
      {{ feedback }}
    </div>
    <button v-if="answered" @click="reset" style="margin-top:10px;padding:8px 16px;border-radius:6px;border:none;background:#4F46E5;color:#fff;cursor:pointer;font-size:0.9rem;">
      🔄 Intentar de nuevo
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ question: String, options: Array, correct: Number })
const selected = ref(null)
const answered = ref(false)
const letters = ['A', 'B', 'C', 'D']

const select = (i) => { selected.value = i; answered.value = true }
const reset = () => { selected.value = null; answered.value = false }

const isCorrect = computed(() => selected.value === props.correct)
const feedback = computed(() => isCorrect.value ? '✅ ¡Correcto! ' + props.options[props.correct] : '❌ Incorrecto. La respuesta correcta es: ' + props.options[props.correct])
const feedbackStyle = computed(() => isCorrect.value ? 'background:rgba(16,185,129,0.1);color:#047857;border:1px solid #10B981;' : 'background:rgba(239,68,68,0.08);color:#B91C1C;border:1px solid #EF4444;')

const buttonStyle = (i) => {
  if (!answered.value) return {}
  if (i === props.correct) return { borderColor: '#10B981', background: 'rgba(16,185,129,0.08)' }
  if (i === selected.value) return { borderColor: '#EF4444', background: 'rgba(239,68,68,0.08)' }
  return { opacity: 0.5 }
}
</script>
