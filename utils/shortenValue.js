const shortenValue = (value) => {
  if (value >= 1000000) {
    // Convert to millions
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (value >= 1000) {
    // Convert to thousands
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    // Return the value as is if it's less than 1000
    return value;
  }
}

export default shortenValue;