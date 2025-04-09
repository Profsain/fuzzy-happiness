import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { BackTopBar } from '../home'

const AddSocialHandle = ({navigation}) => {
  const handleBackBtn = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar
        headline="Add Social Handle"
        icon2=""
        func={handleBackBtn}
      />
      <Text>AddSocialHandle</Text>
    </SafeAreaView>
  )
}

export default AddSocialHandle