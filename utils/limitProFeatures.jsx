import { Alert } from "react-native";

const handleLimit = (navigation, userProfile, condition, message, func) => {
    console.log("Condition", condition);
    // check if user is pro user
    if (!userProfile?.isSubscriber && condition) {
        Alert.alert(
            "Free Plan Limit Reached",
            `${message}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Upgrade",
                    onPress: () => {
                        navigation.navigate("MembershipScreen");
                    },
                },
            ],
        );
        return;
    } else {
        func();
    }
};

export default handleLimit;