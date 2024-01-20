import { Heading } from "@gluestack-ui/themed";
import React from "react";

const CustomHeadings = ({title="I am a Heading"}) => {
  return <Heading mb={16}>{title}</Heading>;
};

export default CustomHeadings;
