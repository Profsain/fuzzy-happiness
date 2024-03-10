import * as MailComposer from 'expo-mail-composer';

const sendEmail = async (recipients, subject, content) => {
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

    try {
        // Send email with custom template
        await MailComposer.sendAsync({
            recipients: recipients,
            subject: subject,
            body: emailBody,
            isHtml: true,
            attachments: [],
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

export default sendEmail;

// Example usage:
// sendEmail(['recipient1@example.com', 'recipient2@example.com'], 'Dynamic Subject', 'Dynamic content of the email.');
