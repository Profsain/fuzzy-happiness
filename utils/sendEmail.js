import sendPushNotification from "./sendPushNotification";

const sendEmail = async (recipients, subject, content, notificationMessage, userId) => {
       // base url
    const baseUrl = process.env.BASE_URL;
    // Define CSS styles
    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                margin: 20px;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                font-size: 16px;
            }
        </style>
    `;

    // Email body HTML
    const emailBody = `
        <html>
            <head>
                ${styles}
            </head>
            <body>
                <div class="container">
                    <div class="title">${subject}</div>
                    <div class="content">${content}</div>
                </div>
            </body>
        </html>
    `;

   const data = {
          email: recipients,
          subject: subject,
          html: emailBody,
        };

        try {
          const response = await fetch(`${baseUrl}/email/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          if (response) {
            // send otp to phone
            sendPushNotification(
              userId,
              "Splinx Planet",
              notificationMessage
            );
          } else {
            Alert.alert("error", result.message);
          }
        } catch (error) {
          Alert.alert("error", error);
        }
};

export default sendEmail;
