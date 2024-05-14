import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { BackTopBar } from '../home'

const ProfileHome = () => {
  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View>
        <BackTopBar headline="Profile" icon2="" icon=""/>
      </View>
      <Text>ProfileHome</Text>
    </SafeAreaView>
  )
}

export default ProfileHome