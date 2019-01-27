export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export function addCard ({ deckTitle, question, answer }) {
  return {
    type: ADD_CARD,
    deckTitle,
    question,
    answer
  }
}

export function deleteCard (cid) {
  return {
    type: DELETE_CARD
  }
}
