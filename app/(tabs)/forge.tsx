import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GyroscopeDisplay from '@/components/GyroscopeDisplay';
import { PomodoroTimer } from '@/components/PomodoroTimer';

export default function ForgeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      <Text style={styles.text}>Forge</Text>
      <GyroscopeDisplay></GyroscopeDisplay>
      <PomodoroTimer></PomodoroTimer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});
