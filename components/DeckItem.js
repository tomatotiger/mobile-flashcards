import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { gray } from '../constants/Colors'
import { goTo } from '../utils/helpers'

export function DeckItem ({ deck, navigation }) {
  const questionsLength = deck.questions.length
  return (
    <TouchableOpacity
      onPress={() => goTo(navigation, 'DeckDetail', { title: deck.title })}
      key={deck.title}
    >
      <Text style={{ fontSize: 20 }}>{deck.title}</Text>
      <Text style={{ fontSize: 16, color: gray }}>
        {questionsLength > 0 ? questionsLength : 'no'} cards
      </Text>
    </TouchableOpacity>
  )
}
