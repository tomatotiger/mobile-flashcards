import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white } from '../constants/Colors'

export const Score = props => {
  const { scores } = props
  const percentage =
    scores.filter(s => s === 'correct').length / scores.length * 100
  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>Complete!</Text>
      <Text style={{ fontSize: 20 }}>
        The correct percentage is: {percentage.toFixed(1)}%.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'stretch'
  },
  h1Text: {
    fontSize: 50,
    color: '#2e78b7',
    textAlign: 'center',
    marginBottom: 10
  }
})
