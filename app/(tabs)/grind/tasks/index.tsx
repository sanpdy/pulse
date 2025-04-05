import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  date: string; // 'YYYY-MM-DD'
}

export default function TasksScreen() {
  const router = useRouter();

  // Today's date as a YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);

  // To prevent re-checking multiple times per day
  const [lastCheckedDate, setLastCheckedDate] = useState<string | null>(null);

  // 1) Every time the component mounts or updates, check if we've crossed midnight
  //    If so, we examine yesterday's tasks and update streak
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];

    // if it's a new day since we last checked, do the "yesterday check"
    if (lastCheckedDate !== currentDate) {
      checkYesterdayTasks();
      setLastCheckedDate(currentDate);
    }

    // We can re-run this effect anytime tasks change, but it won't re-check
    // unless the date changed because of the 'lastCheckedDate' state above.
  }, [tasks, lastCheckedDate]);

  // 2) Check whether yesterday’s tasks were all completed
  const checkYesterdayTasks = () => {
    const now = new Date();

    // "Yesterday" = current day - 1
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Filter tasks that belong to "yesterday"
    const yesterdayTasks = tasks.filter((t) => t.date === yesterdayStr);

    // If you want "no tasks = a free pass," then allDone = tasks.every(...)
    // If you want "no tasks means you fail," handle that differently:
    const allDone = yesterdayTasks.every((t) => t.isCompleted);

    if (allDone) {
      setCurrentStreak((prev) => prev + 1);
    } else {
      setCurrentStreak(0);
    }
  };

  // Toggle completion of a task
  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  // Add a new task for the selected date
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: tasks.length + 1,
      title: taskInput,
      isCompleted: false,
      date: selectedDate,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput('');
  };

  // Only show tasks for the currently selected day
  const filteredTasks = tasks.filter((t) => t.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Select a Date</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#2196F3' },
        }}
        style={styles.calendar}
      />

      <Text style={styles.dateText}>Tasks for {selectedDate}</Text>
      <Text style={styles.streak}>🔥 Streak: {currentStreak} days</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a task..."
          value={taskInput}
          onChangeText={setTaskInput}
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
            <View style={styles.taskItem}>
              <Text
                style={[
                  styles.taskText,
                  item.isCompleted && { textDecorationLine: 'line-through', opacity: 0.5 },
                ]}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks for this day.</Text>}
      />

      <Button title="⬅ Back to Grind" onPress={() => router.push('/(tabs)/grind')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  calendar: { marginBottom: 10, borderRadius: 10 },
  dateText: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  streak: { fontSize: 16, color: '#666', marginBottom: 10 },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  taskText: { fontSize: 16 },
  emptyText: { textAlign: 'center', color: '#aaa', marginTop: 20 },
});
