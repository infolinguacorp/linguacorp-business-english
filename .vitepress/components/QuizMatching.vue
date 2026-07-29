<template>
  <div class="quiz-match" style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin:20px 0;">
    <div style="font-weight:600;color:#1E1B4B;margin-bottom:12px;font-size:1.05rem;">
      <span style="color:#4F46E5;margin-right:6px;">🔗</span>Empareja las columnas
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      <div style="flex:1;min-width:200px;">
        <div v-for="(item, i) in leftItems" :key="'L'+i"
          @click="selectLeft(i)"
          :style="leftStyle(i)"
          style="padding:12px 16px;border-radius:8px;border:2px solid #E5E7EB;background:#fff;margin-bottom:8px;cursor:pointer;transition:all 0.2s;font-size:0.95rem;">
          {{ item }}
        </div>
      </div>
      <div style="flex:1;min-width:200px;">
        <div v-for="(item, i) in rightItems" :key="'R'+i"
          @click="selectRight(i)"
          :style="rightStyle(i)"
          style="padding:12px 16px;border-radius:8px;border:2px solid #E5E7EB;background:#fff;margin-bottom:8px;cursor:pointer;transition:all 0.2s;font-size:0.95rem;">
          {{ item }}
        </div>
      </div>
    </div>
    <div v-if="allMatched" style="margin-top:14px;padding:12px 16px;border-radius:8px;font-weight:500;background:rgba(16,185,129,0.1);color:#047857;border:1px solid #10B981;">
      ✅ ¡Excelente! Emparejaste todo correctamente.
    </div>
    <button @click="reset" style="margin-top:10px;padding:8px 16px;border-radius:6px;border:none;background:#4F46E5;color:#fff;cursor:pointer;font-size:0.9rem;">🔄 Reiniciar</button>
  </div>
</template>

<script>
export default {
  props: { pairs: { type: Array, default: () => [] } },
  data() {
    return {
      leftItems: this.pairs.map(p => p[0]),
      rightItems: this.shuffle(this.pairs.map(p => p[1])),
      selectedLeft: null,
      selectedRight: null,
      matches: {},
      wrongPairs: []
    }
  },
  computed: {
    allMatched() {
      return Object.keys(this.matches).length === this.pairs.length
    }
  },
  methods: {
    shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) },
    selectLeft(i) {
      if (this.matches[i] !== undefined) return
      this.selectedLeft = i
      this.checkMatch()
    },
    selectRight(i) {
      if (Object.values(this.matches).includes(i)) return
      this.selectedRight = i
      this.checkMatch()
    },
    checkMatch() {
      if (this.selectedLeft === null || this.selectedRight === null) return
      const correctRight = this.pairs[this.selectedLeft][1]
      if (this.rightItems[this.selectedRight] === correctRight) {
        this.matches[this.selectedLeft] = this.selectedRight
        this.wrongPairs = this.wrongPairs.filter(p => p[0] !== this.selectedLeft)
      } else {
        this.wrongPairs.push([this.selectedLeft, this.selectedRight])
        setTimeout(() => { this.wrongPairs = this.wrongPairs.filter(p => !(p[0] === this.selectedLeft && p[1] === this.selectedRight)) }, 800)
      }
      this.selectedLeft = null
      this.selectedRight = null
    },
    leftStyle(i) {
      if (this.matches[i] !== undefined) return { borderColor: '#10B981', background: 'rgba(16,185,129,0.08)', cursor: 'default' }
      if (this.selectedLeft === i) return { borderColor: '#4F46E5', background: 'rgba(79,70,229,0.08)' }
      if (this.wrongPairs.some(p => p[0] === i)) return { borderColor: '#EF4444', background: 'rgba(239,68,68,0.08)' }
      return {}
    },
    rightStyle(i) {
      if (Object.values(this.matches).includes(i)) return { borderColor: '#10B981', background: 'rgba(16,185,129,0.08)', cursor: 'default' }
      if (this.selectedRight === i) return { borderColor: '#4F46E5', background: 'rgba(79,70,229,0.08)' }
      if (this.wrongPairs.some(p => p[1] === i)) return { borderColor: '#EF4444', background: 'rgba(239,68,68,0.08)' }
      return {}
    },
    reset() {
      this.rightItems = this.shuffle(this.pairs.map(p => p[1]))
      this.selectedLeft = null
      this.selectedRight = null
      this.matches = {}
      this.wrongPairs = []
    }
  }
}
</script>
