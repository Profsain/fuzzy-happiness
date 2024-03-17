import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleOpenTransactionScreen } from "../../../store/openScreenSlice";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../CustomButton";
import { primeryColor } from "../../../utils/appstyle";

const SuccessBottomSheet = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const translateY = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 800,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);


  // handle done button
  const handleDone = () => {
    onClose();
    // dispatch to transaction screen
    // dispatch(toggleOpenTransactionScreen());
    // clear the input fields
    // get balance update
  };


  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.modal}>
        <View>
          <AntDesign name="checkcircle" size={90} color={primeryColor} />
        </View>
        <View>
          <Text className="text-center text-3xl font-semibold mb-4">Success</Text>
          <Text className="text-lg text-center">You've successfully added $0.00 to your Splinx wallet.</Text>
        </View>

        <CustomButton label="Done" buttonFunc={handleDone} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: "white",
    padding: 36,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 400,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default SuccessBottomSheet