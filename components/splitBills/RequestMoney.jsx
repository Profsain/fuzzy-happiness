import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import MembersRowCard from "./component/MembersRowCard";
import { HorizontalTitle } from "../home";
import SuccessBottomSheet from "./component/SuccessBottomSheet";

const RequestMoney = ({ navigation }) => {

  // handle back to prev screen when device back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // component state
  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // handle add money
  const handleRequest = () => {
    toggleModal();
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Request Money" func={handleBack} />
        <ScrollView>
          {/* wallet balance */}
          <View className="my-4 flex flex-row justify-between items-center">
            <View className="flex  content-center items-end">
              <Text className="font-semibold text-lg">Received</Text>
              <Text className="font-semibold text-xs"> $600.00</Text>
            </View>
            <View className="flex  content-center items-end">
              <Text className="font-semibold text-lg">Outstanding</Text>
              <Text className="font-semibold text-xs">$800.00</Text>
            </View>
          </View>

          {/* add money section */}
          <CustomInput mb={24} placeholder="Event Name" />
          <CustomInput mb={24} placeholder="Amount" keyboardType="numeric" />
          <CustomInput placeholder="Note" />

          {/* member list section to select from flatList scrollable*/}
          <View>
            <HorizontalTitle title="Select members" icon="" action="" />

            <MembersRowCard />
            <MembersRowCard
              imgUrl="https://img.freepik.com/free-photo/portrait-young-handsome-african-man-blue-wall_176420-2339.jpg?t=st=1710626498~exp=1710630098~hmac=96457b13d44d42d906ab4cc9429f68b45ed3670f33b4a7390f4181e0cd9a3bb1&w=826"
              memberName="Grace Pero"
            />
            <MembersRowCard
              imgUrl="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=826&t=st=1710626441~exp=1710627041~hmac=91402668e99223790db54de3553a9c5e61a11defabbb9e6e4ef0f16b28c1ce87"
              memberName="Fred James"
            />
            <MembersRowCard
              imgUrl="https://img.freepik.com/free-photo/carefree-relaxed-pretty-young-mixed-race-female-wearing-big-round-eyeglasses-smiling-broadly-feeling-excited-about-spending-vacations-abroad_273609-1260.jpg?t=st=1710626535~exp=1710630135~hmac=4733b7502db243a164e78fd0ae3c8da5edd2539cdd6e0da4879cd4b1239a357d&w=826"
              memberName="Ekemini Rico"
            />
          </View>

          {/* add money button */}
          <View className="my-8">
            <CustomButton label="Send Request" buttonFunc={handleRequest} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet
          isVisible={isModalVisible}
          onClose={toggleModal}
          heading="Request Sent"
          message="Your request has been sent. We'll notify you once it's accepted or declined"
        />
      )}
    </>
  );
};

export default RequestMoney;
