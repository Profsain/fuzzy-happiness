import React from "react";
import { Center } from "@gluestack-ui/themed";
import { View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { primeryColor } from "../../utils/appstyle";

const TimeModal = ({ showTimeModal, setShowTimeModal, setTime }) => {
  const formatTime = ({ hours, minutes }) => {
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
  };

  return (
    <Center h={300}>
      <View
        style={{
          backgroundColor: "#514242",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TimerPickerModal
          visible={showTimeModal}
          setIsVisible={setShowTimeModal}
          onConfirm={(pickedDuration) => {
            // extract hours and minutes from pickedDuration
            const { hours, minutes } = pickedDuration;
            const formattedTime = formatTime({ hours, minutes });

            setTime(formattedTime);
            setShowTimeModal(false);
          }}
          modalTitle="Select Event Time"
          onCancel={() => setShowTimeModal(false)}
          closeOnOverlayPress
          use12HourPicker
          LinearGradient={LinearGradient}
          styles={{
            theme: "light",
            confirmButton: {
                backgroundColor: primeryColor,
                color: "white",
                borderColor: primeryColor,
            },
          }}
          modalProps={{
            overlayOpacity: 0.2,
          }}
        />
      </View>
    </Center>
  );
};

export default TimeModal;
