import { deleteDeckCards } from './cards'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function deleteDeck (did) {
  return {
    type: DELETE_DECK
  }
}

export function handleDeleteDeck (did) {
  return dispatch => {
    return deleteDeck().then(() => {
      dispatch(deleteDeck(did))
      dispatch(deleteDeckCards(did))
    })
  }
}
