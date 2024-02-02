import { Input, InputField, InputSlot, InputIcon, SearchIcon,Box } from '@gluestack-ui/themed';
import React from 'react'

const SearchBox = ({
  placeholder = "Search....",
  searchTerm,
  handleSearch,
}) => {
  return (
    <Box mb={28}>
      <Input size="xl">
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          type="text"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </Input>
    </Box>
  );
};

export default SearchBox