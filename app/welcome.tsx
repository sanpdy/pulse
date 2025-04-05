import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      <View style={styles.content}>
        <Text style={styles.title}>FlowForge</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.option, styles.flowOption]} 
            onPress={() => router.push('/(tabs)/flow')}
          >
            <Text style={styles.optionText}>Flow</Text>
            <Text style={styles.optionDescription}>Find your peace</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, styles.forgeOption]} 
            onPress={() => router.push('/(tabs)/forge')}
          >
            <Text style={styles.optionText}>Forge</Text>
            <Text style={styles.optionDescription}>Push your limits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: '#2A3A2C',
    textAlign: 'center',
    marginBottom: 60,
    letterSpacing: 8,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  option: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
  },
  flowOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  forgeOption: {
    backgroundColor: 'rgba(255, 138, 128, 0.1)',
    borderColor: 'rgba(255, 138, 128, 0.3)',
  },
  optionText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#2A3A2C',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#666666',
  },
});
