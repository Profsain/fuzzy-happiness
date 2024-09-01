const sortEventsByDate = (events) => {
  return events.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
};



export default sortEventsByDate;