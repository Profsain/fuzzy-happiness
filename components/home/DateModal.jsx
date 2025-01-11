import React from "react";
import {
  Modal,
  Center,
  Button,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Icon,
  CloseIcon,
  ButtonText,
} from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { primeryColor } from "../../utils/appstyle";

const DateModal = ({ showDateModal, setShowDateModal, date, setDate }) => {
  const ref = React.useRef(null);
  date = date ? dayjs(date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
  return (
    <Center h={300}>
      <Modal
        isOpen={showDateModal}
        onClose={() => {
          setShowDateModal(false);
        }}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Select Event Date</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View style={styles.container}>
              <DateTimePicker
                mode="single"
                selectedItemColor={primeryColor}
                date={date}
                onChange={(params) =>
                  setDate(() => dayjs(params.date).format("YYYY-MM-DD"))
                }
              />
            </View>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowDateModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              bg={primeryColor}
              onPress={() => {
                setShowDateModal(false);
              }}
            >
              <ButtonText>Ok</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
export default DateModal;
