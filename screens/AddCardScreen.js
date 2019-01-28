import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { gray, errorText } from '../constants/Colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions/cards'
import { SubmitBtn } from '../components/SubmitButton'
import { goBack } from '../utils/helpers'

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
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={text => this.onChange('question', text)}
          value={question}
          placeholder='Question'
          placeholderTextColor={gray}
        />
        <TextInput
          onChangeText={text => this.onChange('answer', text)}
          value={answer}
          placeholder='Answer'
          placeholderTextColor={gray}
        />
        <Text style={styles.messageText}> {message} </Text>
        <SubmitBtn onPress={this.onSubmit} disabled={this.disabled()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  messageText: {
    fontSize: 14,
    color: errorText
  }
})

function mapStateToProps ({decks}, { navigation }) {
  const title = navigation.getParam('title')
  const deck = decks[title]
  return {
    existedQuestions: deck.questions.map(c => c.question)
  }
}

export default connect(mapStateToProps)(AddCardScreen)
