 // handle confirm password
  const handleConfirmPasswordChange = (text, password, setConfirmPassword, setConfirmPasswordError, setIsAllValid) => {
    setConfirmPassword(text.trim());
    // validate confirm password
    if (text.length === 0) {
      setConfirmPasswordError("Confirm password is required");
    } else if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
      setIsAllValid(true);
    }
  };

  export default handleConfirmPasswordChange;