import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { white, gray, errorText } from '../constants/Colors'
import { addDeck } from '../actions/decks'
import { goTo } from '../utils/helpers'
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
      saveDeckTitle(title)
      goTo(this.props.navigation, 'DeckDetail', { title })
    }
  }

  render () {
    const { disabled, title, message } = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.h1Text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onChange}
          value={title}
          placeholder='Desk title'
          placeholderTextColor={gray}
        />
        <Text style={styles.messageText}> {message} </Text>
        <SubmitBtn onPress={this.onSubmit} disabled={title.trim() === ''} />
      </KeyboardAvoidingView>
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
  messageText: {
    fontSize: 14,
    color: errorText,
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 10
  },
  h1Text: {
    fontSize: 34,
    color: '#2e78b7',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10
  }
})

function mapStateToProps ({decks}) {
  return {
    existedTitles: decks ? Object.keys(decks) : []
  }
}

export default connect(mapStateToProps)(AddDeckScreen)
