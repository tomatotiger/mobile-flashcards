import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { TextButton } from '../components/TextButton'
import { white } from '../constants/Colors'
import { goBack } from '../utils/helpers'

export const Score = props => {
  const { scores, restartQuiz } = props
  const percentage =
    scores.filter(s => s === 'correct').length / scores.length * 100
  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>Complete!</Text>
      <Text style={{ fontSize: 20 }}>
        The correct percentage is: {percentage.toFixed(1)}%.
      </Text>
      <View style={styles.buttons}>
        <TextButton onPress={restartQuiz}>Restart Quiz</TextButton>
        <TextButton onPress={() => goBack(props.navigation)}>
          Back to deck
        </TextButton>
      </View>
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
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 20
  }
})
