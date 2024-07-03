import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import PropTypes from "prop-types";

const EmailTemplate = ({
  headline = "SplinX Planet",
  salutation = "Dear",
  firstName = "User",
  content = "Welcome to SplinX Planent",
  buttonText = "Learn more",
  buttonLink = "https://splinxplanet.com/",
  cta = "In the meantime, check out our app features",
  closingRemarks = "Thank you for choosing SplinX Planet",
}) => {
  return (
    <View style={styles.container}>
     
      <Text style={styles.header}>{headline}</Text>
      <View style={styles.content}>
        <Text style={styles.text}>
          {salutation}, {firstName}.{"\n"}
          {content}
        </Text>
        <Text style={styles.text}>{cta}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(buttonLink)}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, styles.closingRemarks]}>{closingRemarks}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Arial",
    backgroundColor: "#f4f4f4",
    color: "#333",
    maxWidth: 600,
    margin: "auto",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 5,
  },
  header: {
    textAlign: "center",
    margin: 20,
    fontSize: 24,
    fontWeight: "700",
  },
  content: {
    textAlign: "left",
    lineHeight: 1.6,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  closingRemarks: {
    marginTop: 20,
  },
});

EmailTemplate.propTypes = {
  buttonLink: PropTypes.string,
  buttonText: PropTypes.string,
  closingRemarks: PropTypes.string,
  content: PropTypes.string,
  cta: PropTypes.string,
  firstName: PropTypes.string,
  headline: PropTypes.string,
  salutation: PropTypes.string,
};

export default EmailTemplate;
