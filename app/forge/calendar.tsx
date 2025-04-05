import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import * as taskStorage from '@/app/services/taskStorage'
import {requestNotificationPermissions, scheduleTaskNotifications} from "@/app/services/notificationModule";


export default function TasksScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<taskStorage.Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastCheckedDate, setLastCheckedDate] = useState<string | null>(null);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    taskStorage.loadTasks().then(setTasks);
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await taskStorage.saveTasks(tasks);
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Every time the tasks update (or when the component mounts), check if we’ve crossed midnight
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];

    if (lastCheckedDate !== currentDate) {
      checkYesterdayTasks();
      setLastCheckedDate(currentDate);
    }
  }, [tasks, lastCheckedDate]);

  // Check whether yesterday’s tasks were all completed
  const checkYesterdayTasks = () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const yesterdayTasks = tasks.filter((t) => t.date === yesterdayStr);
    const allDone = yesterdayTasks.every((t) => t.isCompleted);

    if (allDone) {
      setCurrentStreak((prev) => prev + 1);
    } else {
      setCurrentStreak(0);
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async(taskId: number) => {
    const updatedTasks = await taskStorage.markTaskAsDone(taskId);
    setTasks(updatedTasks);
  };

  // Add a new task for the selected date
  const addTask = async () => {
    if (!taskInput.trim()) return;

    // request notification access
    const granted = await requestNotificationPermissions();
    if (!granted){// only save locally
      alert('No Notification Permissions!');
      await taskStorage.addTask(taskInput, selectedDate, []);
      const updatedTasks = await taskStorage.loadTasks();
      setTasks(updatedTasks);
      setTaskInput('');
    } else { // create notificaitons
      // schedule notifications
      const notif_ids = await scheduleTaskNotifications({
        title: "Grind Alert!",// replace with actual title,
        desc: taskInput,
        date: new Date(selectedDate),
      })

      await taskStorage.addTask(taskInput, selectedDate, notif_ids);
      const updatedTasks = await taskStorage.loadTasks();
      setTasks(updatedTasks);
      setTaskInput('');
    }
  };

  // Only show tasks for the currently selected date
  const filteredTasks = tasks.filter((t) => t.date === selectedDate);

  // Back button handler
  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>📅 Select a Date</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#FF453A' },
        }}
        style={styles.calendar}
      />

      <Text style={styles.dateText}>Tasks for {selectedDate}</Text>
      <Text style={styles.streak}>🔥 Streak: {currentStreak} days</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a task..."
          placeholderTextColor="#ccc"
          value={taskInput}
          onChangeText={setTaskInput}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
            <View style={styles.taskItem}>
              <Text style={[styles.taskText, item.isCompleted && { textDecorationLine: 'line-through', opacity: 0.5 }]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks for this day.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#330000',
  },
  headerContainer: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  calendar: {
    marginBottom: 10,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFFFFF',
  },
  streak: {
    fontSize: 16,
    color: '#FFD1D1',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#FF453A',
    borderWidth: 1,
    borderRadius: 6,
    color: '#000000',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#FF453A',
    borderRadius: 6,
    marginLeft: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#440000',
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  emptyText: {
    textAlign: 'center',
    color: '#FFD1D1',
    marginTop: 20,
  },
});
