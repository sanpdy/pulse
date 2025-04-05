import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PomodoroTimer } from '../../components/PomodoroTimer';
import GyroscopeDisplay from '../../components/GyroscopeDisplay';

export default function PomodoroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <PomodoroTimer />
      </View>
      <View style={styles.section}>
        <GyroscopeDisplay />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#330000', // Dark red background
  },
  section: {
    marginBottom: 30, // Add spacing between components
  },
});