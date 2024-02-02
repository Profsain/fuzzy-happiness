import {
  Box,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React from "react";
import { Image } from "react-native";

const InviteCard = ({
  avatarUri = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  name = "Friend Name",
  phoneNumber = "+2347098765685",
  bgcolor = "#E5E5E5",
  btnColor = "#E9E9E9",
  btnText = "Invite",
}) => {
  // const nameChar = name[0].toUpperCase();

  return (
    <Box backgroundColor={bgcolor} mb={8}>
      {/* profile avatar */}
      <HStack space="xl" pt={6} pl={12}>
        <Avatar size="md" bgColor="#E0E0E0">
          <AvatarFallbackText>AA</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: avatarUri,
            }}
            alt="avatar"
          />
        </Avatar>
        <VStack width={120}>
          <Heading size="xs">{name}</Heading>
          <Text size="xs">{phoneNumber}</Text>
        </VStack>
        <Button size="xs" mt={4} bgColor={btnColor}>
          <Image source={require("../assets/invite.png")} />
          <ButtonText ml={8} color="#000">
            {btnText}
          </ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default InviteCard;
