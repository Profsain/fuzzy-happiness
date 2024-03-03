// Function to sort events based on eventDate and prioritize events created by the current user
const sortEventsByUserFirst = (events, userId) => {
    // Create a copy of the events array to avoid mutating the original array
  const sortedEvents = [...events]; 

  // Sort events by eventDate
  sortedEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  // Prioritize events created by the current user
  sortedEvents.sort((a, b) => {
    if (a.eventCreator === userId && b.eventCreator !== userId) {
      return -1; // Place event a before event b
    } else if (a.eventCreator !== userId && b.eventCreator === userId) {
      return 1; // Place event b before event a
    } else {
      return 0; // Maintain the current order
    }
  });

  return sortedEvents;
};

export default sortEventsByUserFirst;