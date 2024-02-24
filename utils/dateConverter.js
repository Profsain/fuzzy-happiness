const formatDate = (inputDate) =>{
  const months = [
    "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];
  const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat."];

  const dateParts = inputDate.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const formattedDate = `${days[new Date(inputDate).getDay()]} ${day}${getDaySuffix(day)} ${months[month - 1]}, ${year}`;
  return formattedDate;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default formatDate;
