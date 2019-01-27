import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions/decks'
import { ADD_CARD, DELETE_CARD } from '../actions/decks'

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
        [action.title]: { title: action.title, questions: [] }
      }
    case DELETE_DECK:
      return Object.keys(state)
        .filter(t => t !== action.title)
        .reduce((obj, key) => {
          obj[key] = state[key]
          return obj
        }, {})
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: state[action.deckTitle].questions.concat({
            question: action.question,
            answer: action.answer
          })
        }
      }
    case DELETE_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: state[action.deckTitle].questions.filter(
            q => q.question !== action.question
          )
        }
      }

    default:
      return state
  }
}

export default decks
