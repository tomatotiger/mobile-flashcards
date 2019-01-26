export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const ANSWER_CARD = 'ANSWER_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export function receiveCards (cards) {
  return {
    type: RECEIVE_CARDS,
    cards
  }
}

export function addCard (card) {
  return {
    type: ADD_CARD,
    card
  }
}

export function answerCard ({ cid, correct }) {
  return {
    type: ADD_CARD,
    cid,
    correct
  }
}

export function deleteCard (cid) {
  return {
    type: DELETE_CARD
  }
}

export function deleteDeckCards (did) {
  return {
    type: DELETE_CARD
  }
}
