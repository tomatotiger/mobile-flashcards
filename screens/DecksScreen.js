import React from 'react'
import { connect } from 'react-redux'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoading } from 'expo'

import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import { DeckItem } from '../components/DeckItem'

class DecksScreen extends React.Component {
  state = { ready: false }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render () {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.keys(decks).length > 0 ? (
            <View style={styles.getStartedContainer}>
              {Object.values(decks).map(deck => (
                <DeckItem
                  deck={deck}
                  key={deck.title}
                  navigation={this.props.navigation}
                />
              ))}
            </View>
          ) : (
            <Text>No Decks</Text>
          )}
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
  getStartedContainer: {
    paddingVertical: 10,
    alignItems: 'stretch',
    marginHorizontal: 30
  }
})

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DecksScreen)
