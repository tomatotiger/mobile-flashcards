import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import DeckDetailScreen from '../screens/DeckDetailScreen'
import QuizScreen from '../screens/QuizScreen'
import AddCardScreen from '../screens/AddCardScreen'
import { white, purple } from '../constants/Colors'

export default createAppContainer(
  createStackNavigator({
    Main: MainTabNavigator,
    DeckDetail: {
      screen: DeckDetailScreen,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },

    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },

    AddCard: {
      screen: AddCardScreen,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    },

  })
)
