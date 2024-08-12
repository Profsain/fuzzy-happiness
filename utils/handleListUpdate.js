  // handle add and remove interest from interest list
  const handleListUpdate = (id, data, setList) => {
    // Add or remove item from itemsList
   setList(prevList => {
    const itemExists = prevList.some(item => item.id === id);
    if (itemExists) {
      return prevList.filter(item => item.id !== id);
    } else {
      const item = data.find(item => item.id === id);
      return [...prevList, item];
    }
  });
};
  
export default handleListUpdate;
