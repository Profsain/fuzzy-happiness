import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";
import { BackTopBar } from "../home";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import SuccessBottomSheet from "./component/SuccessBottomSheet";
import useFetchWallet from "../../hooks/useFetchWallet";
import { useLogin } from "../../context/LoginProvider";
// flutterwave import
import { PayWithFlutterwave } from "flutterwave-react-native";

const AddMoney = ({ navigation }) => {
  // base URL
  const baseUrl = process.env.BASE_URL;
  const merchantId = process.env.FW_MERCHANT_ID;
  const { userProfile, token } = useLogin();
  const {_id, emailAddress, firstName, lastName, phoneNumber} = userProfile;

  // call useFetchWallet
  const wallet = useFetchWallet();

  /* An example function called when transaction is completed successfully or canceled */
  // const handleOnRedirect = (data) => {
  //   Alert.alert("Funded Data", JSON.stringify(data))
  //   console.log(data);
  // };

  /* An example function to generate a random transaction reference */
  // const generateTransactionRef = (length) => {
  //   let result = "";
  //   let characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return `flw_tx_ref_${result}`;
  // };

  // handle back to prev screen when device back button press
  
  const handleBack = () => {
    navigation.goBack();
  };

  // component state
  // open bottom sheet
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [note, setNote] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [processing, setProcessing] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

 
  // update amount
  const handleAmount = (text) => {
    setAmount(`$${text}`);
    // validate
    
  };

  // update note
  const handleNote = (text) => {
    setNote(text);
  };

  // initiate funding 
   const initiatePayment = async (
     amount,
     email,
     name,
     phonenumber,
     description,
   ) => {
     try {
       const response = await fetch(`${baseUrl}/flw-api/fund-wallet`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           amount,
           currency: "USD",
           email,
           name,
           phonenumber,
           description
         }),
       });

       const data = await response.json();
       const { link } = data.data;
       // Alert.alert("Payment Link", JSON.stringify(data));

       navigation.navigate("AddMoneyPayScreen", { paymentLink: link });
     } catch (error) {
       console.error(error);
     }
   };

  // handle add money
  const handleAddMoney = async () => {
    setProcessing(true);

    // call initiate payment
    await initiatePayment(
      amount,
      emailAddress,
      `${firstName} ${lastName}`,
      phoneNumber,
      `${firstName} ${lastName} fund wallet with ${amount}. Note: ${note || ""}`,
    );
    // for testing
    navigation.navigate("AddMoneySuccess");
  };

  return (
    <>
      <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
        {/* top bar */}
        <BackTopBar headline="Top up" func={handleBack} />

        {/* wallet balance */}
        <Text className="font-semibold text-lg text-center my-8">
          Balance ${wallet?.balance?.toFixed(2) || "0.00"}
        </Text>

        {/* add money section */}
        <CustomInput
          mb={24}
          placeholder="Amount"
          error={amountError}
          keyboardType="numeric"
          inputValue={amount}
          handleTextChange={handleAmount}
        />
        <CustomInput
          placeholder="Note"
          inputValue={note}
          handleTextChange={handleNote}
        />

        {/* add money button */}
        <View className="mt-28">
          <CustomButton label="Add Money" buttonFunc={handleAddMoney} />

          {/* <PayWithFlutterwave
            onRedirect={handleOnRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: `${merchantId}`,
              customer: {
                email: emailAddress,
              },
              amount: 2000,
              currency: "USD",
              payment_options: "card",
            }}
            customButton={(props) => (
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={props.onPress}
                isBusy={props.isInitializing}
                disabled={props.disabled}
              >
                <Text style={styles.paymentButtonText}>Pay $500</Text>
              </TouchableOpacity>
            )}
          /> */}
        </View>
      </SafeAreaView>

      {/* bottom sheet */}
      {isModalVisible && (
        <SuccessBottomSheet isVisible={isModalVisible} onClose={toggleModal} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: "#FF5C01",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMoney;
