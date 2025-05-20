import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { updateProfile } from '../API_Callings/R1_API/Auth';

async function registerForPushToken() {
    if (!Device.isDevice) return;
  
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') return;
  
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    
    updateProfile({expoToken: token});

    // Save to your backend
    // await fetch('https://your-backend.com/api/save-token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, userId: 'YOUR_USER_ID' }),
    // });
}

export default registerForPushToken;