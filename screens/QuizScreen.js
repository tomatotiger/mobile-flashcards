import React from 'react'
import { connect } from 'react-redux'
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native'

import { Score } from '../components/Score'
import { recordScore } from '../actions/scores'
import { goTo } from '../utils/helpers'
import { white } from '../constants/Colors'

class QuizScreen extends React.Component {
  state = {
    fliped: false,
    showScore: false
  }

  onFlip = fliped => {
    this.setState({ fliped })
  }

  onAnswer = answer => {
    const { last, title, quizIndex, dispatch, navigation } = this.props
    dispatch(recordScore({ quizIndex, answer }))
    const nextIndex = quizIndex + 1
    this.setState({ fliped: false })
    last === true
      ? this.setState({ showScore: true })
      : goTo(navigation, 'Quiz', { title, quizIndex: nextIndex })
  }

  render () {
    const { title, total, quizIndex, last, quiz, scores } = this.props
    if (quiz === null) {
      return (
        <View style={styles.container}>
          <Text>
            Sorry, you cannot take a quiz because there are no cards in the
            deck.
          </Text>
        </View>
      )
    }
    if (this.state.showScore === true) {
      return <Score scores={scores} />
    } else {
      const { fliped } = this.state
      return (
        <View style={styles.container}>
          <Text style={styles.currentText}>
            {quizIndex + 1} / {total}
          </Text>
          {fliped === false ? (
            // review the question
            <View>
              <Text style={styles.h1Text}>{quiz.question}</Text>

              <TouchableOpacity
                onPress={() => this.onFlip(true)}
                style={styles.flip}
              >
                <Text style={styles.flipText}>Answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // review the answer
            <View style={styles.container}>
              <Text style={styles.h1Text}>{quiz.answer}</Text>
              <TouchableOpacity
                onPress={() => this.onFlip(false)}
                style={styles.flip}
              >
                <Text style={styles.flipText}>Question</Text>
              </TouchableOpacity>
              <View style={styles.buttons}>
                <Button
                  title='Correct'
                  onPress={() => this.onAnswer('correct')}
                />
                <Button
                  title='Incorrect'
                  onPress={() => this.onAnswer('inCorrect')}
                />
              </View>
            </View>
          )}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'stretch'
  },
  h1Text: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 10
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  currentText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  flip: {
    paddingVertical: 15,
    textAlign: 'center'
  },
  flipText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 20
  }
})

function mapStateToProps ({ decks, scores }, { navigation }) {
  const title = navigation.getParam('title')
  const quizIndex = navigation.getParam('quizIndex') || 0
  const deck = decks[title]
  const total = deck.questions.length
  return {
    title,
    total,
    scores,
    quizIndex,
    last: quizIndex + 1 === total,
    quiz: total > 0 ? deck.questions[quizIndex] : null
  }
}
export default connect(mapStateToProps)(QuizScreen)
