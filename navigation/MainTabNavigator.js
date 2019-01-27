import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import DecksScreen from '../screens/DecksScreen'
import AddDeckScreen from '../screens/AddDeckScreen'

const Decks = createSwitchNavigator({
  Decks: DecksScreen
})

Decks.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  )
}

const AddDeck = createSwitchNavigator({
  AddDeck: AddDeckScreen
})

AddDeck.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  )
}

export default createBottomTabNavigator({
  Decks,
  AddDeck
})
