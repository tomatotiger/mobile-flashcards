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

import { DeckItem } from '../components/DeckItem'
import { deleteDeck } from '../actions/decks'
import { removeDeck } from '../utils/api'

class DeckDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }
  deleteDeck = () => {
    const title = this.props.title
    this.props.dispatch(deleteDeck(title))
    removeDeck(title).then(this.toHome())
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'Decks' }))
  }

  render () {
    const { title, deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <DeckItem deck={deck} key={deck.title} navigation={this.props.navigation} />
          </View>
          <Button
            style={{ margin: 20 }}
            title='Add card'
            onPress={() =>
              navigation.navigate('AddCard', { title: deck.title })
            }
          />
          <Button
            style={{ margin: 20 }}
            title='Start quiz'
            onPress={() =>
              navigation.navigate('Quiz', { title: deck.title })
            }
          />
          <Button
            style={{ margin: 20 }}
            title='Delete deck'
            onPress={this.deleteDeck}
          />
        </ScrollView>
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

function mapStateToProps (state, { navigation }) {
  const title = navigation.getParam('title')
  return {
    title,
    deck: state[title]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
