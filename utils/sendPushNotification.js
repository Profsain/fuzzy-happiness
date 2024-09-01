import axios from 'axios';
const sendPushNotification = (userId, notificationTitle, notificationMessage) => {
    const token = process.env.NATIVE_NOTIFY_TOKEN;
    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
          subID: `${userId}`,
          appId: 22245,
          appToken: `${token}`,
          title: notificationTitle,
          message: notificationMessage,
        });
};

export default sendPushNotification;