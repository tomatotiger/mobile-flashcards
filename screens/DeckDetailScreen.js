import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from 'react-native'
import { AppLoading } from 'expo'
import { NavigationActions } from 'react-navigation'

import { goTo, goBack } from '../utils/helpers'
import { DeckItem } from '../components/DeckItem'
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions/decks'
import { initScore } from '../actions/scores'

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
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.getStartedContainer}>
              <DeckItem
                deck={deck}
                key={deck.title}
                navigation={this.props.navigation}
              />
            </View>
            <Button
              style={{ margin: 20 }}
              title='Add card'
              onPress={() => goTo(navigation, 'AddCard', { title: deck.title })}
            />
            <Button
              style={{ margin: 20 }}
              title='Start quiz'
              onPress={this.onQuiz}
            />
            <Button
              style={{ margin: 20 }}
              title='Delete deck'
              onPress={this.onDelete}
            />
          </ScrollView>
        )}
      </View>
    )
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
