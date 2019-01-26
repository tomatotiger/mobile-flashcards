import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default class AddDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Links'
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Add Deck</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
