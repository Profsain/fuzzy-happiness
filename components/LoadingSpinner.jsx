import { View} from 'react-native'
import { HStack, Spinner, Text } from "@gluestack-ui/themed";
import React from 'react'
import {primaryColor} from '../utils/appstyle'

const LoadingSpinner = ({ text = "Please Wait" }) => {
  return (
    <View style={{  justifyContent: "center", alignItems: "center",}}>
      <HStack space="sm">
        <Spinner color="$amber600" size="large" />
        <Text size="md" mt={5}>{text}</Text>
      </HStack>
    </View>
  );
};

export default LoadingSpinner