import {View, Text, Button} from 'react-native';
import { requestNotificationPermissions, scheduleNotification } from "@/app/services/notificationModule";


export default function GrindScreen() {
    const handleBtn = async () => {
        if (!requestNotificationPermissions()) {
            alert('No Notification Permissions!');
            return;
        }

        await scheduleNotification({
            title: "Zen Forging",
            desc: (Date.now() + 4 * 60 * 60 * 1000) + " You Were Saying? " + Date.now(),
            date: new Date(),// 10 seconds
        });

        alert("Notification Set?");
    }

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>🏋️ GRIND</Text>
        <Button title={"Notification"} onPress={handleBtn}/>
    </View>
  );
}
