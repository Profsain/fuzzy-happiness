import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { useDispatch } from "react-redux";
import useBackHandler from "../../hooks/useDeviceBackBtn";
import { toggleOpenCreateNewBill } from "../../store/openScreenSlice";
import { BackTopBar, HorizontalTitle } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { primeryColor } from "../../utils/appstyle";
import MembersRowCard from "./component/MembersRowCard";

const CreateNewBills = () => {
  const dispatch = useDispatch();

  // handle back to prev screen when device back button press
  useBackHandler([() => dispatch(toggleOpenCreateNewBill())]);

  // handle create new bill
  const handleCreateNewBill = () => {
    // create new bill
    Alert.alert("create new bill");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      {/* top bar */}
      <BackTopBar
        headline="Create New Bill"
        func={() => dispatch(toggleOpenCreateNewBill())}
      />

      <ScrollView>
        {/* create new bills section */}
        <View className="my-8 ">
          <CustomInput placeholder="Event Name" />

          <CustomInput placeholder="Total Amount" />

          <CustomInput placeholder="Created by" />

          <CustomInput placeholder="Split Percentage" keyboardType="numeric" />

          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Note"
            style={styles.textInput}
          />
        </View>

        {/* member list section to select from flatList scrollable*/}
        <View>
          <HorizontalTitle
            title="Select with whom to split"
            icon=""
            action=""
          />

          <MembersRowCard />
          <MembersRowCard
            imgUrl="https://img.freepik.com/free-photo/portrait-young-handsome-african-man-blue-wall_176420-2339.jpg?t=st=1710626498~exp=1710630098~hmac=96457b13d44d42d906ab4cc9429f68b45ed3670f33b4a7390f4181e0cd9a3bb1&w=826"
            memberName="Grace Pero"
          />
          <MembersRowCard
            imgUrl="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1710626441~exp=1710627041~hmac=91402668e99223790db54de3553a9c5e61a11defabbb9e6e4ef0f16b28c1ce87"
            memberName="Fred James"
          />
          <MembersRowCard imgUrl="https://img.freepik.com/free-photo/carefree-relaxed-pretty-young-mixed-race-female-wearing-big-round-eyeglasses-smiling-broadly-feeling-excited-about-spending-vacations-abroad_273609-1260.jpg?t=st=1710626535~exp=1710630135~hmac=4733b7502db243a164e78fd0ae3c8da5edd2539cdd6e0da4879cd4b1239a357d&w=826" memberName="Ekemini Rico" />
        </View>

        {/* create button */}
        <View className="flex justify-center items-center mt-8">
          <CustomButton
            title="Create"
            onPress={handleCreateNewBill}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "100%",
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    textAlignVertical: "top",
  },
});

export default CreateNewBills;
