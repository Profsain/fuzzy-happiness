
const sendPushNotification = async (userId, notificationTitle, notificationMessage) => {
    const token = process.env.NATIVE_NOTIFY_TOKEN;

    try {
        const res = await fetch('https://app.nativenotify.com/api/indie/notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subID: userId,
                appId: 22245,
                appToken: token,
                title: notificationTitle,
                message: notificationMessage
            })
        });

        const data = await res.json();
        alert('Success:', data);
    } catch (error) {
        alert('Error sending push notification', error); 
    }
};

export default sendPushNotification;