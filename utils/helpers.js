import { NavigationActions } from 'react-navigation'

export const formatResults = results => {
  return JSON.parse(results)
}

export const goBack = navigation => {
  navigation.dispatch(NavigationActions.back())
}

export const goTo = (navigation, to, paras) => {
  navigation.navigate(to, paras)
}
