import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions/decks'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK:
      return state.filter(d => d.id !== action.did)
    default:
      return state
  }
}

export default decks
