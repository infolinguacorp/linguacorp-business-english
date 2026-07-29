<template>
  <div class="quiz-fb" style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin:20px 0;">
    <div style="font-weight:600;color:#1E1B4B;margin-bottom:12px;font-size:1.05rem;">
      <span style="color:#4F46E5;margin-right:6px;">✏️</span>Completa la frase:
    </div>
    <div style="font-size:1rem;line-height:2.2;color:#374151;margin-bottom:16px;">
      <span v-for="(part, i) in parts" :key="i">
        <span v-if="part.type === 'text'">{{ part.value }}</span>
        <input
          v-else
          v-model="userAnswers[i]"
          :disabled="checked"
          :style="inputStyle(i)"
          style="width:110px;padding:4px 10px;border-radius:6px;border:2px solid #D1D5DB;font-size:0.95rem;text-align:center;outline:none;transition:border-color 0.2s;"
          @focus="$event.target.style.borderColor='#4F46E5'"
          @blur="$event.target.style.borderColor='#D1D5DB'"
        />
      </span>
    </div>
    <div v-if="!checked" style="display:flex;gap:10px;">
      <button @click="check" style="padding:8px 20px;border-radius:6px;border:none;background:#4F46E5;color:#fff;cursor:pointer;font-weight:500;">✅ Verificar</button>
      <button @click="reset" style="padding:8px 16px;border-radius:6px;border:1px solid #D1D5DB;background:#fff;color:#4B5563;cursor:pointer;">🔄 Limpiar</button>
    </div>
    <div v-else style="margin-top:12px;">
      <div style="padding:12px 16px;border-radius:8px;font-weight:500;" :style="allCorrect ? 'background:rgba(16,185,129,0.1);color:#047857;border:1px solid #10B981;' : 'background:rgba(245,158,11,0.1);color:#B45309;border:1px solid #F59E0B;'">
        {{ allCorrect ? '✅ ¡Perfecto! Todas las respuestas son correctas.' : '⚠️ Revisa las respuestas marcadas en rojo. Intenta de nuevo.' }}
      </div>
      <button @click="reset" style="margin-top:10px;padding:8px 16px;border-radius:6px;border:none;background:#4F46E5;color:#fff;cursor:pointer;font-size:0.9rem;">🔄 Intentar de nuevo</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { sentence: String, answers: { type: Array, default: () => [] } },
  data() {
    const raw = this.sentence.split(/(___+)/g)
    return {
      parts: raw.map(val => ({ type: val.includes('___') ? 'blank' : 'text', value: val })),
      userAnswers: raw.map(() => ''),
      checked: false
    }
  },
  computed: {
    allCorrect() {
      let bi = 0
      return this.parts.every(p => {
        if (p.type !== 'blank') return true
        const ok = this.normalize(this.userAnswers[this.parts.indexOf(p)]) === this.normalize(this.answers[bi])
        bi++
        return ok
      })
    }
  },
  methods: {
    normalize(s) { return (s || '').trim().toLowerCase() },
    check() { this.checked = true },
    reset() { this.checked = false; this.userAnswers = this.parts.map(() => '') },
    inputStyle(idx) {
      if (!this.checked || this.parts[idx].type !== 'blank') return {}
      const bi = this.parts.slice(0, idx).filter(p => p.type === 'blank').length
      const ok = this.normalize(this.userAnswers[idx]) === this.normalize(this.answers[bi])
      return ok ? { borderColor: '#10B981', background: 'rgba(16,185,129,0.08)' } : { borderColor: '#EF4444', background: 'rgba(239,68,68,0.08)' }
    }
  }
}
</script>
