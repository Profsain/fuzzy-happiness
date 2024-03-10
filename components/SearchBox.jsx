import { Input, InputField, InputSlot, InputIcon, SearchIcon,Box } from '@gluestack-ui/themed';
import React from 'react'

const SearchBox = ({
  placeholder = "Search....",
  searchTerm,
  setSearchTerm,
  handleSearch,
  mt,
  mb=28
}) => {
  return (
    <Box mb={mb} mt={mt}>
      <Input size="xl">
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          type="text"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </Input>
    </Box>
  );
};

export default SearchBox