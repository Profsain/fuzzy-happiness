// Function to filter events by eventCreator (current logged-in user)
const filterEventsByCreator = (events, userId) => {
    // sort events by eventDate
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    // filter events by eventCreator
    return sortedEvents.filter(event => event.eventCreator === userId);
};

export default filterEventsByCreator;