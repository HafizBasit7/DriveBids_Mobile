import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { updateProfile } from "../API_Callings/R1_API/Auth";
import { Alert } from "react-native";

async function registerForPushToken() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") return;

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "2c4b22db-799d-488d-8e42-c34432ec2bbd",
    });
    Alert.alert("Notification Registered", JSON.stringify(tokenData));
    const token = tokenData.data;

    updateProfile({ expoToken: token || "NA" });
  } catch (e) {
    Alert.alert("Error", e.message);
  }

  // Save to your backend
  // await fetch('https://your-backend.com/api/save-token', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ token, userId: 'YOUR_USER_ID' }),
  // });
}

export default registerForPushToken;
