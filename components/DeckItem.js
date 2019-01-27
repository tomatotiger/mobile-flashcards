import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from '../constants/Colors'
import { goBack } from '../utils/helpers'

export function DeckItem ({ deck, navigation }) {
  const questionsLength = deck.questions.length
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DeckDetail', { title: deck.title })}
      key={deck.title}
    >
      <Text style={{ fontSize: 20 }}>{deck.title}</Text>
      <Text style={{ fontSize: 16, color: gray }}>
        {questionsLength > 0 ? questionsLength : 'no'} cards
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  }
})

//       <View style={styles.container}>
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}
//         >
//           <View style={styles.getStartedContainer}>
//             <Text style={styles.getStartedText}>Get started by opening</Text>

//             <View
//               style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
//             >
//               <MonoText style={styles.codeHighlightText}>
//                 screens/DecksScreen.js
//               </MonoText>
//             </View>

//             <Text style={styles.getStartedText}>
//               Change this text and your app will automatically reload.
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity
//               onPress={this._handleHelpPress}
//               style={styles.helpLink}
//             >
//               <Text style={styles.helpLinkText}>
//                 Help, it didn’t automatically reload!
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>
//             This is a tab bar. You can edit it in:
//           </Text>

//           <View
//             style={[styles.codeHighlightContainer, styles.navigationFilename]}
//           >
//             <MonoText style={styles.codeHighlightText}>
//               navigation/MainTabNavigator.js
//             </MonoText>
//           </View>
//         </View>
//       </View>
