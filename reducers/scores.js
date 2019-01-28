import { RESET_SCORE, INIT_SCORE, RECORD_SCORE } from '../actions/scores'

function scores (state = [], action) {
  switch (action.type) {
    case INIT_SCORE:
      const total = action.total
      return new Array(total).fill(null)
    case RECORD_SCORE:
      const { quizIndex, answer } = action
      return state.map((item, i) => (i === quizIndex ? answer : item))
    case RESET_SCORE:
      return []
    default:
      return state
  }
}

export default scores
