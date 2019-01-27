export const RESET_SCORE = 'RESET_SCORE'
export const INIT_SCORE = 'INIT_SCORE'
export const RECORD_SCORE = 'RECORD_SCORE'

export function reset () {
  return {
    type: RESET_SCORE
  }
}

export function initScore (total) {
  return {
    type: INIT_SCORE,
    total
  }
}

export function recordScore ({ index, isCorrect }) {
  return {
    type: RECORD_SCORE,
    index,
    isCorrect
  }
}
