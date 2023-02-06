import {useEffect} from 'react';
import expoPushTokens from '../../api/expoPushTokens';
import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

export default useNotification = notificationListener => {
  useEffect(() => {
    registerForPushNotifications();
    if (notificationListener)
      Notifications.addPushTokenListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!(await permission).granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokens.register(token);
    } catch (error) {
      console.log('error getting a push token', error);
    }
  };
};
