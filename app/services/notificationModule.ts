import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-notifications'
import { Platform } from "react-native";

// function to request notification permission for setting notifications
export async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

// function to schedule notifications provided a title, description, and time
export async function scheduleNotification(
    {title, desc, date,} : {title: string, desc: string, date: Date}
) {
    await Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    // get values for creating three notifications
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    // create the three notification times
    const sixAM = new Date(year, month, day, 6, 0, 0, 0);
    const twelvePM = new Date(year, month, day, 12, 0, 0, 0);
    const sixPM = new Date(year, month, day, 18, 0, 0, 0);

    return async () => {
        // schedule the three notifications
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body: desc,
                categoryIdentifier: undefined,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: sixAM,
            },
        })
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body: desc,
                categoryIdentifier: undefined,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: twelvePM,
            },
        })
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body: desc,
                categoryIdentifier: undefined,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: sixPM,
            },
        })
    }
}