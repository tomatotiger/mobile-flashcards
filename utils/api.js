import { AsyncStorage } from 'react-native'
import { formatResults } from './helpers'

export const DACK_STORAGE_KEY = 'Flashcards:decks'
export const TASK_STORAGE_KEY = 'Flashcards:dailyTask'

export function getDecks () {
  return AsyncStorage.getItem(DACK_STORAGE_KEY).then(formatResults)
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(
    DACK_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title, questions: [] }
    })
  )
}
export function addCardToDeck ({ deckTitle, question, answer }) {
  return AsyncStorage.getItem(DACK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[deckTitle].questions.push({ question, answer })
    AsyncStorage.mergeItem(DACK_STORAGE_KEY, JSON.stringify(data))
  })
}

export function removeCard (cid) {
  return AsyncStorage.mergeItem()
}

export function removeDeck (title) {
  return AsyncStorage.getItem(DACK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[title] = undefined
    delete data[title]
    AsyncStorage.setItem(DACK_STORAGE_KEY, JSON.stringify(data))
  })
}

export function getLogs () {
  return AsyncStorage.getItem(TASK_STORAGE_KEY).then(formatResults)
}

export function addLog ({ date, completed }) {
  return AsyncStorage.mergeItem(
    TASK_STORAGE_KEY,
    JSON.stringify({
      [date]: completed
    })
  )
}
