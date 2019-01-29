import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { tintColor } from '../constants/Colors'

export function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.textButton}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textButton: {
    margin: 10
  },
  reset: {
    textAlign: 'center',
    color: tintColor
  }
})
