import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const HorizontalTitle = () => {
  return (
    <View className="flex justify-between font-mono my-4">
          <Text className="text-black font-semibold" >Hello Pascal</Text>
            <TouchableOpacity>
              <Text>Click me</Text>
            </TouchableOpacity>
    </View>
  )
}

export default HorizontalTitle