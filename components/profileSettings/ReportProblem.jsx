import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { BackTopBar } from "../home";
import LoadingSpinner from "../LoadingSpinner";
import CustomButton from "../CustomButton";
import { secondBgColor } from "../../utils/appstyle";

const ReportProblem = ({ navigation }) => {
  // base url
  const baseUrl = process.env.BASE_URL;

  // extract from useLogin context
  const { userProfile, token } = useLogin();

  const [reportProblem, setReportProblem] = useState("");
  const [reportError, setReportError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  // handle back button
  const handleBackBtn = () => {
    // navigate back
    navigation.goBack();
  };

  // handle text change
  const handleTextChange = (text) => {
    // set report problem
    setReportProblem(text);

    // check if report problem is empty
    if (text === "") {
      // set report error
      setReportError("Report problem cannot be empty");
    } else if (text.length < 25) {
      // set report error
      setReportError("Report problem cannot be less than 25 characters");
    } else {
      // set report error
      setReportError("");
      // set is valid
      setIsValid(true);
    }
  };

  // handle send report
  const handleSendReport = async () => {
    setReportSent(true);

    // use html template for email
    const message = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #f9784b;">App Problems Report</h1>

    <p>Dear Support Team,</p>
    <p>Report from ${userProfile.firstName} | Phone Number:  ${userProfile.phoneNumber} | Email Address: ${userProfile.emailAddress}.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p>Report Problem: ${reportProblem}</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #666;">Best regards,<br>${userProfile.firstName} ${userProfile.lastName}</p>
  </div>
`;

    const emailAddress = "splinxplanent@gmail.com";

    const data = {
      email: emailAddress,
      subject: "SplinX Planet User Report Problem",
      html: message,
    };

    try {
      const response = await fetch(`${baseUrl}/email/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setReportSent(false);
        // show success alert and navigate to AccountSettings 
        Alert.alert("Report Sent", "Report sent successfully", [
          { text: "OK", onPress: () => navigation.navigate("AccountSettings") },
        ]);
      } else {
        setReportSent(false);
        Alert.alert("error", result.message);
      }
    } catch (error) {
      Alert.alert("error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Report" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex">
        <TextInput
          multiline={true}
          numberOfLines={8}
          placeholder="Briefly explain what occur or what is not working as expected"
          className="border-b-2 border-slate-100 mt-2 text-lg"
          value={reportProblem}
          onChangeText={handleTextChange}
        />

        {reportError !== "" && (
          <Text className="text-red-500 text-sm">{reportError}</Text>
        )}

        <View className="mt-28">
          {reportSent && <LoadingSpinner />}

          {isValid ? (
            <CustomButton label="Submit Report" buttonFunc={handleSendReport} />
          ) : (
            <CustomButton
              label="Submit Report"
              backgroundColor={secondBgColor}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportProblem;
