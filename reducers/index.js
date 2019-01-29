import { combineReducers } from 'redux'
import decks from './decks'
import scores from './scores'
import dailyTask from './dailyTask'

export default combineReducers({
  decks,
  scores,
  dailyTask
})
