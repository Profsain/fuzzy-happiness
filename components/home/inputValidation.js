  const handleValidation = (errorObj, setErrorObj, eventData, eventDate, eventTime, eventCategory, eventImage) => {
    if (!eventData.eventName) {
      setErrorObj({ ...errorObj, eventNameError: "Event name is required" });
    } else if (!eventData.eventLocation) {
      setErrorObj({
        ...errorObj,
        eventLocationError: "Event location is required",
      });
    } else if (!eventData.eventDescription) {
      setErrorObj({
        ...errorObj,
        eventDescriptionError: "Event description is required",
      });
    } else if (!eventData.eventUserRules) {
      setErrorObj({
        ...errorObj,
        eventUserRulesError: "Event rules is required",
      });
    } else if (!eventData.eventHashtags) {
      setErrorObj({
        ...errorObj,
        eventHashtagsError: "Event hashtags is required",
      });
    } else if (!eventDate) {
      setErrorObj({ ...errorObj, eventDateError: "Event date is required" });
    } else if (!eventTime) {
      setErrorObj({ ...errorObj, eventTimeError: "Event time is required" });
    } else if (!eventCategory) {
      setErrorObj({
        ...errorObj,
        eventCategoryError: "Event category is required",
      });
    } else if (!eventImage) {
      setErrorObj({
        ...errorObj,
        eventImageError: "Event image is required",
      });
    } else {
      setErrorObj({
        eventNameError: "",
        eventLocationError: "",
        eventDescriptionError: "",
        eventUserRulesError: "",
        eventHashtagsError: "",
        eventDateError: "",
        eventTimeError: "",
        eventCategoryError: "",
        eventImageError: "",
      });
    }
  };

  export default handleValidation;