import React, { useState } from "react";
import { useLogin } from "../../context/LoginProvider";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import BackTopBar from "../home/BackTopBar";
import Accordion from "./component/Accordion";

const PushNotification = ({ navigation }) => {
  const { pushNotification = [], token } = useLogin();
  const baseUrl = process.env.BASE_URL;
  const [notifications, setNotifications] = useState(pushNotification);

  // handle back to prev screen
  const handleBack = () => {
    navigation.goBack();
  };

  // Function to mark a notification as read
  const markAsRead = async (index, id) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true; // Update the read status
    setNotifications(updatedNotifications); // Update the state

    // Update the notification status in the database
    try {
      const response = await fetch(`${baseUrl}/api/notification/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Check if the response is okay 
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to mark as read"}`);
        console.error("Error response:", errorData);
        return; // Exit the function if the request was not successful
      }

      const data = await response.json();
      alert(data.message); // Alert success message
      console.log(data); // Log the data for debugging
    } catch (error) {
      console.error("update error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
      <View className="pb-8">
        <BackTopBar headline="Notifications" icon2="" func={handleBack} />
      </View>

      {/* Notifications section */}
      <ScrollView>
        {pushNotification.length > 0 ? (
          pushNotification.map((notification, index) => (
            <Accordion key={index} title={notification.title}>
              <View className="py-2">
                <Text className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </Text>
                <View className="flex flex-row justify-between items-center">
                  <Text
                    className={`text-xs ${
                      notification.read ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {notification.read ? "Read" : "Unread"}
                  </Text>

                  {/* Mark as read button */}
                  {!notification.read && (
                    <TouchableOpacity
                      onPress={() => markAsRead(index, notification._id)}
                      className="mt-2 px-4 py-2 bg-blue-500 rounded"
                    >
                      <Text className="text-white text-xs">Mark as Read</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Accordion>
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-4">
            No notifications available.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PushNotification;
