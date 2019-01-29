import React from 'react'
import { connect } from 'react-redux'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppLoading } from 'expo'

import { getDecks, getLogs, addLog } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import { DeckItem } from '../components/DeckItem'
import { receiveLogs, completeTask } from '../actions/dailyTask'
import { timeToString } from '../utils/helpers'

class DecksScreen extends React.Component {
  state = { ready: false }

  componentDidMount () {
    const { dispatch, completed } = this.props

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))

    getLogs()
      .then(logs => dispatch(receiveLogs(logs)))

    completed === null &&
      addLog({ date: timeToString(), completed: false }).then(
        dispatch(completeTask({ date: timeToString(), completed: false }))
      )
  }

  render () {
    const { decks, completed } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        {completed !== true && (
          <View>
            <Text>👋 Let's take some quizz!</Text>
          </View>
        )}
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

function mapStateToProps ({ decks, dailyTask }) {
  const today = timeToString()
  const completed = Object.keys(dailyTask).includes(today) ? dailyTask[today] : null
  return {
    decks,
    completed
  }
}
export default connect(mapStateToProps)(DecksScreen)
