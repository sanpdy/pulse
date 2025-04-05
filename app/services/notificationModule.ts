import * as Notifications from 'expo-notifications'

// function to request notification permission for setting notifications
export async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

// function to schedule notifications provided a title, description, and time
export async function scheduleTaskNotifications(
    {title, desc, date,} : {title: string, desc: string, date: Date}
) {
    Notifications.setNotificationHandler({
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
    const times = [
        new Date(year, month, day, 6, 0, 0, 0),// six am
        new Date(year, month, day, 12, 0, 0, 0),// twelve pm
        new Date(year, month, day, 18, 0, 0, 0),// six pm
    ]
    const ids =[];
    // schedule the three notifications
    for (let i = 0; i < times.length; i++) {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body: desc,
                categoryIdentifier: undefined,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: times[i],
            }
        });
        ids.push(id); // notification ids for database
    }
}

// cancel a tasks notification if marked as done
export async function cancelTaskNotifications({notification_ids} : {notification_ids: string[]}) {
    for (const id of notification_ids) {
        if (id) await Notifications.cancelScheduledNotificationAsync(id);
    }
}