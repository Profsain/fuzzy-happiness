// Function to limit text to maxLength characters and add "..." if it exceeds
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


export default truncateText;