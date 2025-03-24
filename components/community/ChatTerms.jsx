import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../CustomButton';
const ChatTerms = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    await AsyncStorage.setItem("termsAccepted", "true");
    setAccepted(true);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>
        Community Terms of Engagement
      </Text>

      <Text style={{marginTop: 10, fontSize: 16, marginBottom: 40, textAlign: "center"}}>
        By using Splinx Planet, you agree to not post or engage in objectionable content, including hate speech, harassment, or illegal activities. Violations may result in account suspension.
      </Text>

        <View>
          <CustomButton buttonFunc={handleAccept} label='Accept Terms & Proceed'/>
        </View>
    </View>
  )
}

export default ChatTerms