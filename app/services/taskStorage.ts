import AsyncStorage from '@react-native-async-storage/async-storage';
import {cancelTaskNotifications} from "@/app/services/notificationModule";

export interface Task {
    id: number;
    title: string;
    date: string; // ISO string format
    isCompleted: boolean;
    notif_ids: string[]; // IDs returned by scheduleNotificationAsync
}

const TASKS_KEY = 'tasks';

// function to load tasks
export const loadTasks = async (): Promise<Task[]> => {
    try {
        const stored = await AsyncStorage.getItem(TASKS_KEY);
        return stored ? JSON.parse(stored) as Task[] : [];
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks:', error);
    }
};

export const markTaskAsDone = async (taskId: number): Promise<Task[]> => {
    const tasks = await loadTasks();
    const updatedTasks = await Promise.all(tasks.map(async task => {
        if (task.id === taskId) {
            // Cancel all scheduled notifications
            await cancelTaskNotifications({notification_ids: task.notif_ids});
            return {
                ...task,
                task_finished: !task.isCompleted,
                notif_ids: [],
            };
        }
        return task;
    }));
    await saveTasks(updatedTasks);
    return updatedTasks
};

export const deleteTask = async (taskId: number): Promise<Task[]> => {
    const tasks = await loadTasks();
    const updatedTasks: Task[] = [];

    for (const task of tasks) {
        if (task.id === taskId) {
            await cancelTaskNotifications({notification_ids: task.notif_ids});
        } else {
            updatedTasks.push(task);
        }
    }

    await saveTasks(updatedTasks);
    return updatedTasks;
};

export const addTask = async (
    title: string,
    due_date: string,// Date.toISOstring()
    notif_ids: string[]
): Promise<void> => {
    const newTask: Task = {
        id: Date.now(), // simple unique ID
        title,
        date: due_date,
        isCompleted: false,
        notif_ids,
    };

    const tasks = await loadTasks();
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
};
