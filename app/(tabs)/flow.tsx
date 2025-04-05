import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function FlowScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      <View style={styles.content}>
        <Text style={styles.title}>Flow</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.option, styles.breathingOption]} 
            onPress={() => router.push('/flow/breathing')}
          >
            <Text style={styles.optionText}>Breathing</Text>
            <Text style={styles.optionDescription}>Calm your mind</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, styles.soundscapesOption]} 
            onPress={() => router.push('/flow/soundscapes')}
          >
            <Text style={styles.optionText}>Soundscapes</Text>
            <Text style={styles.optionDescription}>Ambient sounds</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, styles.quotesOption]} 
            onPress={() => router.push('/flow/quotes')}
          >
            <Text style={styles.optionText}>Quotes</Text>
            <Text style={styles.optionDescription}>Find inspiration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A3A2C',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 8,
  },
  optionsContainer: {
    gap: 20,
  },
  option: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
  },
  breathingOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  soundscapesOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  quotesOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  optionText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#999999',
  },
});
