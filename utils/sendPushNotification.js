const sendPushNotification = (userId, notificationTitle, notificationMessage) => {
  const token = process.env.NATIVE_NOTIFY_TOKEN;

  // Create the payload to send in the request
  const payload = {
      subID: `${userId}`,
      appId: 22245,
      appToken: `${token}`,
      title: notificationTitle,
      message: notificationMessage,
  };

  // Use fetch to make the POST request
  fetch('https://app.nativenotify.com/api/indie/notification', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',  // Make sure to specify JSON content
      },
      body: JSON.stringify(payload),  // Convert the payload to a JSON string
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('Failed to send notification');
      }
      return response.json();  // Parse the JSON response if successful
  })
  .then((data) => {
      console.log('Notification sent successfully:', data);
  })
  .catch((error) => {
      console.error('Error sending notification:', error);
  });
};

export default sendPushNotification;
