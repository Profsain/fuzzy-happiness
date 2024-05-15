import { View, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import { BackTopBar } from '../home'
import OptionButton from './component/OptionButton'

const ProfileHome = ({navigation}) => {
  // handle personal info
  const handlePersonalInfo = () => {
    // navigate to PersonalInfoScreen
    navigation.navigate("PersonalInfoScreen");
  }
  // handle membership
  const handleMembership = () => {
    // navigate to MembershipScreen
    navigation.navigate("MembershipScreen");
  }
  // handle notification
  const handleNotification = () => {
    // navigate to NotificationPreScreen
    navigation.navigate("NotificationPreScreen");
  }
  // handle account
  const handleAccount = () => {
    // navigate to AccountSettings
    navigation.navigate("AccountSettings");
  }
  // handle log out
  const handleLogout = () => {
    // clear login context
    // navigate to login screen
  }

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <View>
        <BackTopBar headline="Profile" icon2="" icon="" />
      </View>

      {/* option list */}
      <View className="mt-6">
        <OptionButton
          btnText="Personal Information"
          iconLeft=""
          btnFunc={handlePersonalInfo}
        />
        <OptionButton
          btnText="Membership"
          iconLeft=""
          btnFunc={handleMembership}
        />
        <OptionButton
          btnText="Notifications Preferences"
          iconLeft=""
          btnFunc={handleNotification}
        />
        <OptionButton
          btnText="Account Settings"
          iconLeft=""
          btnFunc={handleAccount}
        />
        <OptionButton
          btnText="Log out"
          iconLeft=""
          iconRight=""
          btnFunc={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
}

export default ProfileHome