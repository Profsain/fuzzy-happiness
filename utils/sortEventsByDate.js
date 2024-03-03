const sortEventsByDate = (events) => {
  return events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
};

export default sortEventsByDate;