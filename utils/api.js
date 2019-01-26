import { AsyncStorage } from 'react-native'

export function getDecks () {
  return AsyncStorage.getItem('decks')
}

export function getDeck ({ did }) {
  return AsyncStorage.getItem(did)
}

export function SaveDeckTitle (title) {
  AsyncStorage.setItem({ title })
}
export function addCardToDeck ({ did, cid, cardData }) {
  return AsyncStorage.mergeItem(
    did,
    JSON.stringify({
      [cid]: cardData
    })
  )
}
export function deleteCard (cid) {
  return AsyncStorage.mergeItem()
}

export function deleteDeck (did) {
  return AsyncStorage.mergeItem(did)
}
