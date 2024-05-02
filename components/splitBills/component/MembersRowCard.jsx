import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
} from "@gluestack-ui/themed";
import { primeryColor } from "../../../utils/appstyle";

const MembersRowCard = ({ imgUrl, memberName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View className="flex flex-row justify-between items-center border p-2 mb-3 rounded-md border-gray-300">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri:
              imgUrl ||
              "https://img.freepik.com/free-photo/portrait-african-american-man_23-2149072178.jpg?t=st=1710623990~exp=1710627590~hmac=26800ea0366ac29ba24cd1fd547567c353c0cb58089d438b03946062dc83f536&w=826",
          }}
          className="w-8 h-8 rounded-full mr-6"
        />
        <Text className="text-lg">{memberName || "John Doe"}</Text>
      </View>
      {/* checkbox */}

      <Checkbox
        size="md"
        isInvalid={false}
        isDisabled={false}
        aria-label="checkbox"
        isChecked={isChecked}
        onChange={handleCheckboxChange}
      >
        <CheckboxIndicator
          mr="$2"
          style={{
            backgroundColor: isChecked ? primeryColor : "transparent",
            borderColor: isChecked ? primeryColor : "gray",
          }}
        >
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
    </View>
  );
};

export default MembersRowCard;
