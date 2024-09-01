const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with 0 if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-indexed) and pad
  const year = date.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`;
}

export default getCurrentDate;