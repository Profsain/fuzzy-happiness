import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  // handle login
  const handleLogin = () => {
    Alert.alert("Get Ready to Login");
  }
  // handle signup
  const handleSignUp = () => {
    Alert.alert("Get Ready to Sign Up");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/loginimage.png")}
        className="w-38 h-35 p-4 object-contain"
      />

      <View style={styles.btnContainer}>
        <CustomButton label='Log in' buttonFunc={handleLogin}/>
        <CustomButton label='Sign up' backgroundColor='#feeee8' color='#000' buttonFunc={handleSignUp}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 60,
  },
})

export default LoginScreen