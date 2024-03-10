// search events list
const  searchEvents = (eventData, searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  
  const filteredEvents = eventData?.filter(event => {
    return event.eventName.toLowerCase().includes(searchTermLower) ||
           event.eventCategory?.toLowerCase().includes(searchTermLower) ||
           event.eventLocation?.toLowerCase().includes(searchTermLower) ||
           event.eventHashTags?.some(tag => tag.toLowerCase().includes(searchTermLower));
  });

  return filteredEvents;
}

export default searchEvents;
