

const navigateToScreen = (navigation, screenName, data) => {
    navigation.navigate(screenName, {data});
};

export default navigateToScreen;