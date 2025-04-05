import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PomodoroTimer } from '../../components/PomodoroTimer';
import GyroscopeDisplay from '../../components/GyroscopeDisplay';
import Header from './Header'; // Adjust path if needed

export default function PomodoroScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Pomodoro" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <PomodoroTimer />
        </View>
        <View style={styles.section}>
          <GyroscopeDisplay />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#330000', // Dark red background
  },
  headerContainer: {
    marginTop: 20,
    paddingTop: 40,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30, // Spacing between components
  },
});
