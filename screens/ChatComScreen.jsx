import { Image, Text, View } from 'react-native'
import React from 'react'

const ChatComScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Chat Screen </Text>
      <Image className="w-24 h-24" source={require('../assets/images/WorkInProgress.png')} />
    </View>
  )
}

export default ChatComScreen