import React from 'react'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/cards'
import { SubmitBtn } from '../components/SubmitButton'
import { goBack } from '../utils/helpers'
import { white, gray, errorText } from '../constants/Colors'

class AddCardScreen extends React.Component {
  state = {
    question: '',
    answer: '',
    message: ''
  }

  onChange = (k, v) => {
    this.setState({ [k]: v })
  }

  existed = question => {
    const existedQuestions = this.props.existedQuestions
    return existedQuestions.length > 0 && existedQuestions.includes(question)
  }

  onSubmit = () => {
    const deckTitle = this.props.navigation.getParam('title')
    const question = this.state.question.trim()
    const answer = this.state.answer.trim()

    if (this.existed(question)) {
      this.setState({ message: 'This quiz already exists.' })
    } else {
      const quiz = { deckTitle, question, answer }
      this.props.dispatch(addCard(quiz))
      this.setState({ question: '', answer: '' })
      goBack(this.props.navigation)
      addCardToDeck(quiz)
    }
  }

  disabled = () => {
    const { question, answer } = this.state
    return question.trim() === '' || answer.trim() === ''
  }

  render () {
    const deckTitle = this.props.navigation.getParam('title')
    const { question, answer, message } = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.h1Text}>Input the question and answer:</Text>
        <TextInput
          onChangeText={text => this.onChange('question', text)}
          value={question}
          style={styles.input}
          placeholder='Question'
          placeholderTextColor={gray}
        />
        <TextInput
          onChangeText={text => this.onChange('answer', text)}
          style={styles.input}
          value={answer}
          placeholder='Answer'
          placeholderTextColor={gray}
        />
        <Text style={styles.messageText}> {message} </Text>
        <SubmitBtn onPress={this.onSubmit} disabled={this.disabled()} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'stretch'
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

function mapStateToProps ({ decks }, { navigation }) {
  const title = navigation.getParam('title')
  const deck = decks[title]
  return {
    existedQuestions: deck.questions.map(c => c.question)
  }
}

export default connect(mapStateToProps)(AddCardScreen)
