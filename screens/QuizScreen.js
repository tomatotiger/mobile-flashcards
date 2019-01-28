import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native'

import { MonoText } from '../components/StyledText'
import { DeckItem } from '../components/DeckItem'
import { Score } from '../components/Score'
import { recordScore } from '../actions/scores'
import { goTo } from '../utils/helpers'

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
    this.setState({fliped: false})
    last === true 
      ? this.setState({showScore: true})
      : goTo(navigation, 'Quiz', { title, quizIndex: nextIndex })
  }

  render () {
    const { title, total, quizIndex, last, quiz, scores } = this.props
    if (quiz === null) {
      return (
        <View>
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
          <Text style={styles.helpLinkText}>
            {quizIndex + 1} / {total}
          </Text>
          {fliped === false ? (
            // review the question
            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.getStartedContainer}>
                <Text>{quiz.question}</Text>
              </View>

              <View style={styles.helpContainer}>
                <TouchableOpacity
                  onPress={() => this.onFlip(true)}
                  style={styles.helpLink}
                >
                  <Text style={styles.helpLinkText}>Answer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // review the answer
            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.getStartedContainer}>
                <Text>{quiz.answer}</Text>
              </View>
              <View style={styles.helpContainer}>
                <TouchableOpacity
                  onPress={() => this.onFlip(false)}
                  style={styles.helpLink}
                >
                  <Text style={styles.helpLinkText}>Question</Text>
                </TouchableOpacity>
              </View>
              <Button
                style={{ margin: 20 }}
                title='Correct'
                onPress={() => this.onAnswer('correct')}
              />
              <Button
                style={{ margin: 20 }}
                title='Incorrect'
                onPress={() => this.onAnswer('inCorrect')}
              />
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
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    flexDirection: 'row',
    marginTop: 12
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
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
