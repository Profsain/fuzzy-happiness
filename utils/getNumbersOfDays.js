const  daysBetweenDates = (givenDate) => {
  // Convert givenDate to Date object
  const givenDateTime = new Date(givenDate).getTime();

  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceMs = givenDateTime - today.getTime();

  // Convert difference to days
  const differenceDays = Math.ceil(differenceMs / (1000 * 3600 * 24));

  return differenceDays;
}

export default daysBetweenDates;    
