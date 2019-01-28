import React from 'react'
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import { white, tintColor } from '../constants/Colors'

export function SubmitBtn ({ onPress, disabled }) {
  const buttonStyle =
    Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={
        disabled === true
          ? { ...buttonStyle, backgroundColor: '#dfdfdf' }
          : buttonStyle
      }
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: tintColor,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: tintColor,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
