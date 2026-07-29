import DefaultTheme from 'vitepress/theme'
import './custom.css'
import QuizMultipleChoice from '../components/QuizMultipleChoice.vue'
import QuizFillBlank from '../components/QuizFillBlank.vue'
import QuizMatching from '../components/QuizMatching.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizMultipleChoice', QuizMultipleChoice)
    app.component('QuizFillBlank', QuizFillBlank)
    app.component('QuizMatching', QuizMatching)
  }
}
