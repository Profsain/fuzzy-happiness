import React from "react";
import { SafeAreaView, View, ScrollView, Text } from "react-native";
import BackTopBar from "../home/BackTopBar";
import Accordion from "./component/Accordion";

const FaqScreen = ({ navigation }) => {
  // handle back to prev screen
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-16 bg-white">
      <View className="pb-8">
        <BackTopBar headline="FAQ" icon2="" func={handleBack} />
      </View>

      {/* faq section */}
      <View>
        <ScrollView>
          <Accordion title="How to create event?">
            <Text>
              To create an event, go to the Events tab and click on the Create
              Event button. Fill in the required details and click on the Create
              button to create the event.
            </Text>
          </Accordion>
          <Accordion title="How to register for an event?">
            <Text>
              To register for an event, go to the Events tab and click on the
              event you want to register for. Click on the Register button to
              register for the event.
            </Text>
          </Accordion>
          <Accordion title="How to split event budget?">
            <Text>
              To split the event budget, go to the Bil tab and click on the
              create new bill. 
              Select event you want to split the budget for. 
              Select event members to split budget with and then Click on the Split Budget
              button to split the budget for the event.
            </Text>
          </Accordion>
          <Accordion title="Activate your wallet?">
            <Text>
               Click on the Bill tab and click on Activate Wallet button.
            </Text>
          </Accordion>
          <Accordion title="How to fund my wallet account">
            <Text>
              To fund your wallet account, go to the Wallet tab and click on the
              Fund Wallet button. Fill in the required details and click on the
              Add Money button to fund your wallet account.
            </Text>
          </Accordion>
          <Accordion title="How to transfer money to friends wallet?">
            <Text>
              To transfer money to friends wallet, go to the Wallet tab and click on the
              Transfer Money button. Fill in the required details and click on the
              Transfer button to transfer money to friends wallet.
            </Text>
          </Accordion>
          <Accordion title="How to report a problem?">
            <Text>
              To report a problem, go to the Profile tab and click on the
              Report Problem button. Fill in the required details and click on the
              Submit button to report a problem.
            </Text>
          </Accordion>
          <Accordion title="How to talk to support team?">
            <Text>
              To talk to support team, go to the Profile Setting tab and click on the
              Live Chat Support button. Fill in the required details and click on the
              Submit button to talk to support team.
            </Text>
          </Accordion>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;
