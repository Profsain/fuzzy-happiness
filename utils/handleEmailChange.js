  const handleEmailChange = (text, setEmail, setEmailError, setIsValid) => {
    setEmail(text.trim().toLowerCase());
    const emailRegex = /\S+@\S+\.\S+/;
    // validate email
    if (text.length === 0) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
      setIsValid(true);
    }
};
  
export default handleEmailChange;