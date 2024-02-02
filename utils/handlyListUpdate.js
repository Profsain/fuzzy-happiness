  // handle add and remove interest from interest list
  const handleListUpdate = (id, listData, setNewList) => {
    // Find  item by id
    const newItem = listData.find((item) => item.id === id);

    if (!newItem) {
      return; // If the item is not found, exit the function
    }

    // Toggle isSelected property of the  item
    newItem.isSelected = !newItem.isSelected;

    // Add or remove item from itemsList
    if (newItem.isSelected) {
      setNewList((prevList) => [...prevList, newItem]);
    } else {
      setNewList((prevList) => prevList.filter((item) => item.id !== id));
    }
};
  
export default handleListUpdate;
