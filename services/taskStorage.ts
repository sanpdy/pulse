import AsyncStorage from '@react-native-async-storage/async-storage';

// Task type definition
export interface Task {
  id: number;
  title: string;
  date: string;
  isCompleted: boolean;
  notificationIds: string[];
}

const TASKS_STORAGE_KEY = 'app_tasks';

// Load all tasks from AsyncStorage
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// Save all tasks to AsyncStorage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (
  title: string,
  date: string,
  notificationIds: string[]
): Promise<Task[]> => {
  try {
    const tasks = await loadTasks();

    // Generate a new ID (use timestamp + random number to ensure uniqueness)
    const newId = Date.now() + Math.floor(Math.random() * 1000);

    const newTask: Task = {
      id: newId,
      title,
      date,
      isCompleted: false,
      notificationIds,
    };

    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Mark a task as done/undone (toggle)
export const markTaskAsDone = async (taskId: number): Promise<Task[]> => {
  try {
    const tasks = await loadTasks();

    if (!tasks || tasks.length === 0) {
      console.warn('No tasks found when trying to mark task as done');
      return [];
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });

    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error marking task as done:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<Task[]> => {
  try {
    const tasks = await loadTasks();

    if (!tasks || tasks.length === 0) {
      console.warn('No tasks found when trying to delete task');
      return [];
    }

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    await saveTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};