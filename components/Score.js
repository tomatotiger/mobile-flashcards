import React from 'react'
import { Text, View } from 'react-native'

export const Score = props => {
  const { scores } = props
  const percentage =
    scores.filter(s => s === 'correct').length / scores.length * 100
  return (
    <View>
      <Text style={{ fontSize: 50 }}>Complete!</Text>
      <Text style={{ fontSize: 20 }}>
        The correct percentage is: {percentage.toFixed(1)}%.
      </Text>
    </View>
  )
}
