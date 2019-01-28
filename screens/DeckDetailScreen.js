import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, Button, View } from 'react-native'

import { goTo, goBack } from '../utils/helpers'
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions/decks'
import { initScore } from '../actions/scores'
import { white, gray } from '../constants/Colors'

class DeckDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }

  onDelete = () => {
    const title = this.props.title
    this.props.dispatch(deleteDeck(title))
    goBack(this.props.navigation)
    removeDeck(title)
  }

  onQuiz = () => {
    const { dispatch, navigation, deck } = this.props
    dispatch(initScore(deck.questions.length))
    goTo(navigation, 'Quiz', { title: deck.title })
  }

  render () {
    const { title, deck, navigation } = this.props
    return (
      <View style={styles.container}>
        {deck && (
          <View style={styles.container}>
            <View style={styles.containerContent}>
              <Text style={styles.h1Text}>{deck.title}</Text>
              <Text style={{ fontSize: 16, color: gray }}>
                {deck.questions.length > 0 ? deck.questions.length : 'no'} cards
              </Text>
            </View>
            <View style={styles.buttons}>
              <Button
                title='Add card'
                onPress={() =>
                  goTo(navigation, 'AddCard', { title: deck.title })
                }
              />
              <Button
                title='Start quiz'
                onPress={this.onQuiz}
              />
              <Button
                title='Delete deck'
                onPress={this.onDelete}
              />
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'stretch',
  },
  containerContent:{
    alignItems: 'center',
  },

  buttons: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 20
  },
  helpText: {
    fontSize: 14,
    color: gray,
    textAlign: 'center',
    marginBottom: 10
  },
  h1Text: {
    fontSize: 34,
    color: '#2e78b7',
    textAlign: 'center',
    marginBottom: 10
  }
})

function mapStateToProps ({ decks }, { navigation }) {
  const title = navigation.getParam('title')
  return {
    title,
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
