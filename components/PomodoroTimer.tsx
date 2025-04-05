import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export function PomodoroTimer() {
  const [mode, setMode] = useState<'Pomodoro' | 'Short Break' | 'Long Break'>('Pomodoro'); // Timer mode
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [timerKey, setTimerKey] = useState(0); // Key to reset the timer

  // Timer durations for each mode
  const durations = {
    Pomodoro: 25 * 60, // 25 minutes
    'Short Break': 5 * 60, // 5 minutes
    'Long Break': 15 * 60, // 15 minutes
  };

  const handleModeSwitch = (newMode: 'Pomodoro' | 'Short Break' | 'Long Break') => {
    setMode(newMode);
    setIsRunning(false); // Pause the timer when switching modes
    setTimerKey((prevKey) => prevKey + 1); // Reset the timer
  };

  const handleReset = () => {
    setIsRunning(false); // Pause the timer
    setTimerKey((prevKey) => prevKey + 1); // Reset the timer
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.modeText}>{mode}</Text>
      <CountdownCircleTimer
        key={timerKey} // Use the timerKey to reset the timer
        isPlaying={isRunning}
        duration={durations[mode]}
        colors={['#007BFF', '#F7B801', '#A30000']}
        colorsTime={[durations[mode], durations[mode] / 2, 0]}
        onComplete={() => {
          setIsRunning(false);
          alert(`${mode} is over!`);
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <Text style={styles.timerText}>
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </Text>
          );
        }}
      </CountdownCircleTimer>
      <View style={styles.buttons}>
      <TouchableOpacity style={[styles.button]} onPress={() => setIsRunning((prev) => !prev)}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button]} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
      <View style={styles.modeButtons}>
        <TouchableOpacity style={styles.modeButton} onPress={() => handleModeSwitch('Pomodoro')}>
          <Text style={styles.modeButtonText}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modeButton} onPress={() => handleModeSwitch('Short Break')}>
          <Text style={styles.modeButtonText}>Short Break</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modeButton} onPress={() => handleModeSwitch('Long Break')}>
          <Text style={styles.modeButtonText}>Long Break</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Set background to transparent
  },
  modeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Keep text white
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF', // Keep text white
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space buttons evenly
    alignItems: 'center', // Align buttons vertically
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
  },
  buttonText: {
    color: '#FFFFFF', // Keep text white
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  modeButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
  },
  modeButtonText: {
    color: '#FFFFFF', // Keep text white
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});