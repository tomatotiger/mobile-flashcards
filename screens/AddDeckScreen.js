import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { white, gray, errorText } from '../constants/Colors'
import { addDeck } from '../actions/decks'
import { saveDeckTitle } from '../utils/api'
import { SubmitBtn } from '../components/SubmitButton'

class AddDeckScreen extends React.Component {
  state = {
    title: '',
    message: ''
  }

  existed = title => {
    const existedTitles = this.props.existedTitles
    return existedTitles.length > 0 && existedTitles.includes(title)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  onChange = title => {
    this.setState({ title, message: '' })
  }

  onSubmit = () => {
    const title = this.state.title.trim()
    if (this.existed(title)) {
      this.setState({ message: 'This deck already exists.' })
    } else {
      this.props.dispatch(addDeck(title))
      this.setState({ title: '' })
      this.toHome()
      saveDeckTitle(title)
    }
  }

  render () {
    const { disabled, title, message } = this.state
    return (
      <View style={styles.row}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.onChange}
          value={title}
          placeholder='Desk title'
          placeholderTextColor={gray}
        />
        <Text style={styles.messageText}> {message} </Text>
        <SubmitBtn onPress={this.onSubmit} disabled={title.trim() === ''} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  messageText: {
    fontSize: 14,
    color: errorText
  },
})

function mapStateToProps (decks) {
  return {
    existedTitles: decks ? Object.keys(decks) : []
  }
}

export default connect(mapStateToProps)(AddDeckScreen)
