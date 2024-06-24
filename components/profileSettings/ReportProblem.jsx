import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackTopBar } from "../home";
import { secondaryColor } from "../../utils/appstyle";

const ReportProblem = () => {
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
  const handleSendReport = () => {
    // send report
    Alert.alert("Report Sent", "Your report has been sent successfully");
  };

  return (
    <SafeAreaView className="flex-1 px-6 pt-14 bg-white">
      <BackTopBar headline="Report" icon2="" func={handleBackBtn} />

      <View className="mt-14 flex">
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Briefly explain what occur or what is not working as expected"
          className="border-b-2 border-slate-100 mt-2 text-lg"
          value={reportProblem}
          onChangeText={handleTextChange}
        />

        {reportError !== "" && (
          <Text className="text-red-500 text-sm">{reportError}</Text>
        )}

        <TouchableOpacity
          onPress={handleSendReport}
          className="bg-blue-500 py-3 mt-14 rounded-lg"
        >
          <Text className="text-white text-center text-lg">Send Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportProblem;
